import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { LOGIN_REPOSITORY } from '@src/auth/applications/contracts/login.repository-interface';
import { LoginUseCase } from '@src/auth/applications/use-cases/login.use-case';
import EncryptUtils from '@src/shared/applications/utils/encrypt.utils';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;

  const loginRepositoryMock = {
    findByEmail: jest.fn(),
    createSession: jest.fn(),
  };

  const encryptUtilsMock = {
    comparePassword: jest.fn(),
  };

  const jwtServiceMock = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginUseCase,
        {
          provide: LOGIN_REPOSITORY,
          useValue: loginRepositoryMock,
        },
        {
          provide: EncryptUtils,
          useValue: encryptUtilsMock,
        },
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
      ],
    }).compile();

    useCase = module.get<LoginUseCase>(LoginUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('authentication validation', () => {
    it('should throw when the user does not exist', async () => {
      loginRepositoryMock.findByEmail.mockResolvedValue(null);

      await expect(
        useCase.execute({ email: 'john@example.com', password: 'secret' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw when the password does not match', async () => {
      loginRepositoryMock.findByEmail.mockResolvedValue({
        id: 'user-id',
        password: 'hashed',
      });
      encryptUtilsMock.comparePassword.mockResolvedValue(false);

      await expect(
        useCase.execute({ email: 'john@example.com', password: 'secret' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('session creation', () => {
    it('should create a session and return the access token', async () => {
      const user = {
        id: 'user-id',
        password: 'hashed',
        role: 'candidate',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        tokenVersion: 1,
      };

      loginRepositoryMock.findByEmail.mockResolvedValue(user);
      encryptUtilsMock.comparePassword.mockResolvedValue(true);
      loginRepositoryMock.createSession.mockResolvedValue(undefined);
      jwtServiceMock.signAsync.mockResolvedValue('token');

      await expect(
        useCase.execute({
          email: 'john@example.com',
          password: 'secret',
          client: { browser: 'Chrome' },
        }),
      ).resolves.toEqual({ access_token: 'token' });

      expect(loginRepositoryMock.createSession).toHaveBeenCalled();
      expect(jwtServiceMock.signAsync).toHaveBeenCalled();
    });
  });
});
