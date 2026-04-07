import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DELETE_USER_REPOSITORY } from '@src/user/applications/contracts/delete-user.repository-interface';
import { DeleteUserUseCase } from '@src/user/applications/use-cases/delete-user.use-case';

describe('DeleteUserUseCase', () => {
  let useCase: DeleteUserUseCase;

  const deleteUserRepositoryMock = {
    delete: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserUseCase,
        {
          provide: DELETE_USER_REPOSITORY,
          useValue: deleteUserRepositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<DeleteUserUseCase>(DeleteUserUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return success when the user is deleted', async () => {
    deleteUserRepositoryMock.delete.mockResolvedValue(true);

    await expect(useCase.execute('user-id')).resolves.toEqual({
      success: true,
    });
    expect(deleteUserRepositoryMock.delete).toHaveBeenCalledWith('user-id');
  });

  it('should throw when the user is not found', async () => {
    deleteUserRepositoryMock.delete.mockResolvedValue(false);

    await expect(useCase.execute('missing-id')).rejects.toThrow(
      NotFoundException,
    );
  });
});
