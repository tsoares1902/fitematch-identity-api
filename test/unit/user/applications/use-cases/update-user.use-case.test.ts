import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UPDATE_USER_REPOSITORY } from '@src/user/applications/contracts/update-user.repository-interface';
import { UpdateUserUseCase } from '@src/user/applications/use-cases/update-user.use-case';

describe('UpdateUserUseCase', () => {
  let useCase: UpdateUserUseCase;

  const updateUserRepositoryMock = {
    update: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserUseCase,
        {
          provide: UPDATE_USER_REPOSITORY,
          useValue: updateUserRepositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<UpdateUserUseCase>(UpdateUserUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return the updated user', async () => {
    const data = { firstName: 'Jane' };
    const expected = { id: 'user-id', firstName: 'Jane' };

    updateUserRepositoryMock.update.mockResolvedValue(expected);

    await expect(useCase.execute('user-id', data)).resolves.toEqual({
      data: expected,
    });
    expect(updateUserRepositoryMock.update).toHaveBeenCalledWith(
      'user-id',
      data,
    );
  });

  it('should throw when the user is not found', async () => {
    updateUserRepositoryMock.update.mockResolvedValue(null);

    await expect(useCase.execute('missing-id', {})).rejects.toThrow(
      NotFoundException,
    );
  });
});
