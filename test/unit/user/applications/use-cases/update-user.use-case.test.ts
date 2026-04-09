import { Test, TestingModule } from '@nestjs/testing';
import { UserNotFoundError } from '@src/user/applications/errors/user-not-found.error';
import { UpdateUserUseCase } from '@src/user/applications/use-cases/update-user.use-case';
import {
  ProductRoleEnum,
  UserStatusEnum,
  type User,
} from '@src/user/domains/entities/user.entity';
import { USER_COMMAND_REPOSITORY } from '@src/user/domains/repositories/user-command.repository';

describe('UpdateUserUseCase', () => {
  let useCase: UpdateUserUseCase;

  const userCommandRepositoryMock = {
    update: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserUseCase,
        {
          provide: USER_COMMAND_REPOSITORY,
          useValue: userCommandRepositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<UpdateUserUseCase>(UpdateUserUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return the updated user', async () => {
    const createdAt = new Date('2024-01-01T00:00:00.000Z');
    const updatedAt = new Date('2024-01-02T00:00:00.000Z');
    const data = { firstName: 'Jane' };
    const expected: User = {
      id: 'user-id',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      birthday: '1990-01-01',
      status: UserStatusEnum.ACTIVE,
      productRole: ProductRoleEnum.CANDIDATE,
      createdAt,
      updatedAt,
    };

    userCommandRepositoryMock.update.mockResolvedValue(expected);

    await expect(useCase.execute('user-id', data)).resolves.toEqual({
      data: {
        id: 'user-id',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        birthday: '1990-01-01',
        status: UserStatusEnum.ACTIVE,
        productRole: ProductRoleEnum.CANDIDATE,
        adminRole: undefined,
        permissions: undefined,
        isInternal: undefined,
        candidateProfile: undefined,
        recruiterProfile: undefined,
        emailVerifiedAt: undefined,
        createdBy: undefined,
        lastLoginAt: undefined,
        suspendedAt: undefined,
        suspendedReason: undefined,
        deactivatedAt: undefined,
        deactivatedReason: undefined,
        bannedAt: undefined,
        bannedReason: undefined,
        createdAt,
        updatedAt,
      },
    });
    expect(userCommandRepositoryMock.update).toHaveBeenCalledWith('user-id', {
      user: data,
    });
  });

  it('should throw when the user is not found', async () => {
    userCommandRepositoryMock.update.mockResolvedValue(null);

    await expect(useCase.execute('missing-id', {})).rejects.toThrow(
      UserNotFoundError,
    );
  });
});
