import { Test, TestingModule } from '@nestjs/testing';
import { UserNotFoundError } from '@src/user/applications/errors/user-not-found.error';
import { DeleteUserUseCase } from '@src/user/applications/use-cases/delete-user.use-case';
import { USER_COMMAND_REPOSITORY } from '@src/user/domains/repositories/user-command.repository';

describe('DeleteUserUseCase', () => {
  let useCase: DeleteUserUseCase;

  const userCommandRepositoryMock = {
    deactivate: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserUseCase,
        {
          provide: USER_COMMAND_REPOSITORY,
          useValue: userCommandRepositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<DeleteUserUseCase>(DeleteUserUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return success when the user is deactivated', async () => {
    userCommandRepositoryMock.deactivate.mockResolvedValue(true);

    await expect(useCase.execute('user-id')).resolves.toEqual({
      success: true,
    });
    expect(userCommandRepositoryMock.deactivate).toHaveBeenCalledWith(
      'user-id',
    );
  });

  it('should throw when the user is not found', async () => {
    userCommandRepositoryMock.deactivate.mockResolvedValue(false);

    await expect(useCase.execute('missing-id')).rejects.toThrow(
      UserNotFoundError,
    );
  });
});
