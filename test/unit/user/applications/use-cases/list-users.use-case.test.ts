import { Test, TestingModule } from '@nestjs/testing';
import { ListUsersUseCase } from '@src/user/applications/use-cases/list-users.use-case';
import {
  ProductRoleEnum,
  UserStatusEnum,
  type User,
} from '@src/user/domains/entities/user.entity';
import { USER_QUERY_REPOSITORY } from '@src/user/domains/repositories/user-query.repository';

describe('ListUsersUseCase', () => {
  let useCase: ListUsersUseCase;

  const userQueryRepositoryMock = {
    list: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListUsersUseCase,
        {
          provide: USER_QUERY_REPOSITORY,
          useValue: userQueryRepositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<ListUsersUseCase>(ListUsersUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return empty data with empty pagination', async () => {
    userQueryRepositoryMock.list.mockResolvedValue({
      data: [],
      totalItems: 0,
      currentPage: 1,
      itemsPerPage: 10,
    });

    await expect(useCase.execute({ page: 1, limit: 10 })).resolves.toEqual({
      data: [],
      pagination: {
        totalItems: 0,
        itemCount: 0,
        itemsPerPage: 10,
        totalPages: 0,
        currentPage: 1,
      },
    });
  });

  it('should return mapped users and pagination when users are found', async () => {
    const createdAt = new Date('2024-01-01T00:00:00.000Z');
    const updatedAt = new Date('2024-01-02T00:00:00.000Z');
    const user: User = {
      id: 'user-id',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      birthday: '1990-01-01',
      status: UserStatusEnum.ACTIVE,
      productRole: ProductRoleEnum.CANDIDATE,
      isInternal: false,
      candidateProfile: {
        contacts: {
          phone: '11987654321',
        },
      },
      createdAt,
      updatedAt,
    };

    userQueryRepositoryMock.list.mockResolvedValue({
      data: [user],
      totalItems: 1,
      currentPage: 1,
      itemsPerPage: 10,
    });

    await expect(useCase.execute({ page: 1, limit: 10 })).resolves.toEqual({
      data: [
        {
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
          candidateProfile: {
            contacts: {
              phone: '11987654321',
            },
          },
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
      ],
      pagination: {
        totalItems: 1,
        itemCount: 1,
        itemsPerPage: 10,
        totalPages: 1,
        currentPage: 1,
      },
    });
  });
});
