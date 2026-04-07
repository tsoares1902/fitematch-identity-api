import { Test, TestingModule } from '@nestjs/testing';
import MetadataUtils from '@src/shared/applications/utils/metadata.utils';
import { MASKS_UTILS } from '@src/shared/applications/utils/masks.utils';
import { LIST_USER_REPOSITORY_INTERFACE } from '@src/user/applications/contracts/list-user.repository-interface';
import { ListUsersUseCase } from '@src/user/applications/use-cases/list-users.use-case';

describe('ListUsersUseCase', () => {
  let useCase: ListUsersUseCase;

  const listUserRepositoryMock = {
    list: jest.fn(),
  };

  const masksUtilsMock = {
    brazilPersonIdentityDocumentMask: jest.fn(),
    brazilPersonSocialDocumentMask: jest.fn(),
    brazilPhoneMask: jest.fn(),
    brazilZipCodeMask: jest.fn(),
  };

  const metadataUtilsMock = {
    getDadosPaginacao: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListUsersUseCase,
        {
          provide: LIST_USER_REPOSITORY_INTERFACE,
          useValue: listUserRepositoryMock,
        },
        {
          provide: MASKS_UTILS,
          useValue: masksUtilsMock,
        },
        {
          provide: MetadataUtils,
          useValue: metadataUtilsMock,
        },
      ],
    }).compile();

    useCase = module.get<ListUsersUseCase>(ListUsersUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return empty data with empty pagination metadata', async () => {
    listUserRepositoryMock.list.mockResolvedValue({
      data: [],
      totalItems: 0,
      currentPage: 1,
      itemsPerPage: 10,
    });

    await expect(
      useCase.execute({ page: 1, limit: 10, route: '/user' }),
    ).resolves.toEqual({
      data: [],
      metadata: {
        pagination: {
          totalItems: 0,
          itemCount: 0,
          itemsPerPage: 10,
          totalPages: 0,
          currentPage: 1,
          links: {
            first: '/user',
            previous: '',
            next: '',
            last: '',
          },
        },
      },
    });
  });

  it('should mask fields and return pagination metadata when users are found', async () => {
    listUserRepositoryMock.list.mockResolvedValue({
      data: [
        {
          id: 'user-id',
          isPaidMembership: true,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          birthday: '1990-01-01',
          role: 'candidate',
          status: 'enabled',
          documents: {
            identityDocument: '123456781',
            socialDocument: '12345678901',
          },
          details: {
            phone: '11987654321',
            zipCode: '12345678',
            isWhatsapp: true,
          },
          social: {
            instagram: '@john',
          },
        },
      ],
      totalItems: 1,
      currentPage: 1,
      itemsPerPage: 10,
    });
    masksUtilsMock.brazilPersonIdentityDocumentMask.mockReturnValue(
      '12-345-678-1',
    );
    masksUtilsMock.brazilPersonSocialDocumentMask.mockReturnValue(
      '123.456.789-01',
    );
    masksUtilsMock.brazilPhoneMask.mockReturnValue('(11) 98765-4321');
    masksUtilsMock.brazilZipCodeMask.mockReturnValue('12345-678');
    metadataUtilsMock.getDadosPaginacao.mockReturnValue({
      totalItems: 1,
      itemCount: 1,
      itemsPerPage: 10,
      totalPages: 1,
      currentPage: 1,
      links: {
        first: '/user?limit=10',
        previous: '',
        next: '',
        last: '/user?page=1&limit=10',
      },
    });

    await expect(useCase.execute({ route: '/user' })).resolves.toEqual({
      data: [
        {
          id: 'user-id',
          isPaidMembership: true,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          birthday: '1990-01-01',
          role: 'candidate',
          status: 'enabled',
          documents: {
            identityDocument: '12-345-678-1',
            socialDocument: '123.456.789-01',
          },
          details: {
            phone: '(11) 98765-4321',
            isWhatsapp: true,
            zipCode: '12345-678',
          },
          social: {
            instagram: '@john',
          },
        },
      ],
      metadata: {
        pagination: {
          totalItems: 1,
          itemCount: 1,
          itemsPerPage: 10,
          totalPages: 1,
          currentPage: 1,
          links: {
            first: '/user?limit=10',
            previous: '',
            next: '',
            last: '/user?page=1&limit=10',
          },
        },
      },
    });

    expect(metadataUtilsMock.getDadosPaginacao).toHaveBeenCalledWith(
      1,
      1,
      10,
      1,
      '/user',
    );
  });
});
