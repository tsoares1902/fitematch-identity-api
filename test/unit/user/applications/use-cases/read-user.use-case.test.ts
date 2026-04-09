import { Test, TestingModule } from '@nestjs/testing';
import { UserNotFoundError } from '@src/user/applications/errors/user-not-found.error';
import { ReadUserUseCase } from '@src/user/applications/use-cases/read-user.use-case';
import {
  ProductRoleEnum,
  UserStatusEnum,
  type User,
} from '@src/user/domains/entities/user.entity';
import { USER_QUERY_REPOSITORY } from '@src/user/domains/repositories/user-query.repository';

describe('ReadUserUseCase', () => {
  let useCase: ReadUserUseCase;

  const userQueryRepositoryMock = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReadUserUseCase,
        {
          provide: USER_QUERY_REPOSITORY,
          useValue: userQueryRepositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<ReadUserUseCase>(ReadUserUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return the user when found', async () => {
    const createdAt = new Date('2024-01-01T00:00:00.000Z');
    const updatedAt = new Date('2024-01-02T00:00:00.000Z');
    const expected: User = {
      id: 'user-id',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      birthday: '1990-01-01',
      status: UserStatusEnum.ACTIVE,
      productRole: ProductRoleEnum.CANDIDATE,
      isInternal: false,
      candidateProfile: {},
      recruiterProfile: undefined,
      createdAt,
      updatedAt,
    };

    userQueryRepositoryMock.findById.mockResolvedValue(expected);

    await expect(useCase.execute('user-id')).resolves.toEqual({
      data: {
        id: 'user-id',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        birthday: '1990-01-01',
        status: UserStatusEnum.ACTIVE,
        productRole: ProductRoleEnum.CANDIDATE,
        adminRole: undefined,
        permissions: undefined,
        isInternal: false,
        candidateProfile: {},
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
    expect(userQueryRepositoryMock.findById).toHaveBeenCalledWith('user-id');
  });

  it('should throw when the user is not found', async () => {
    userQueryRepositoryMock.findById.mockResolvedValue(null);

    await expect(useCase.execute('missing-id')).rejects.toThrow(
      UserNotFoundError,
    );
  });
});
