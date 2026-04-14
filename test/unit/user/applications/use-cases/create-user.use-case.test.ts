import { Test, TestingModule } from '@nestjs/testing';
import { CREATE_USER_REPOSITORY_INTERFACE } from '@src/user/applications/contracts/create-user.repository-interface';
import { CreateUserUseCase } from '@src/user/applications/use-cases/create-user.use-case';
import EncryptUtils from '@src/shared/applications/utils/encrypt.utils';
import { UserStatusEnum } from '@src/user/domains/entities/user.entity';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;

  const createUserRepositoryMock = {
    createUser: jest.fn(),
  };

  const encryptUtilsMock = {
    encryptPassword: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: CREATE_USER_REPOSITORY_INTERFACE,
          useValue: createUserRepositoryMock,
        },
        {
          provide: EncryptUtils,
          useValue: encryptUtilsMock,
        },
      ],
    }).compile();

    useCase = module.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should encrypt the password and apply the default status before persisting', async () => {
    const data = {
      productRole: 'candidate',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'secret',
      birthday: '1990-01-01',
    };
    const expected = { id: 'user-id', ...data, password: 'hashed-password' };

    encryptUtilsMock.encryptPassword.mockResolvedValue('hashed-password');
    createUserRepositoryMock.createUser.mockResolvedValue(expected);

    await expect(useCase.execute(data as never)).resolves.toEqual({
      data: expected,
    });
    expect(encryptUtilsMock.encryptPassword).toHaveBeenCalledWith('secret');
    expect(createUserRepositoryMock.createUser).toHaveBeenCalledWith({
      ...data,
      password: 'hashed-password',
      status: UserStatusEnum.PENDING_ACCOUNT_CONFIRMATION,
    });
  });

  it('should preserve the provided status', async () => {
    const data = {
      productRole: 'candidate',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'secret',
      birthday: '1990-01-01',
      status: UserStatusEnum.ACTIVE,
    };

    encryptUtilsMock.encryptPassword.mockResolvedValue('hashed-password');
    createUserRepositoryMock.createUser.mockResolvedValue({
      id: 'user-id',
      ...data,
      password: 'hashed-password',
    });

    await useCase.execute(data as never);

    expect(createUserRepositoryMock.createUser).toHaveBeenCalledWith({
      ...data,
      password: 'hashed-password',
      status: UserStatusEnum.ACTIVE,
    });
  });
});
