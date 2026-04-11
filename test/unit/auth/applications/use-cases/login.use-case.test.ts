import { Test, TestingModule } from '@nestjs/testing';
import {
  AUTHENTICATION_REPOSITORY,
  type AuthenticatedIdentity,
  type AuthenticationRepository,
} from '@src/auth/domains/repositories/authentication.repository';
import {
  ACCESS_TOKEN_ISSUER,
  type AccessTokenIssuer,
} from '@src/auth/domains/services/access-token-issuer';
import {
  PASSWORD_VERIFIER,
  type PasswordVerifier,
} from '@src/auth/domains/services/password-verifier';
import { LoginUseCase } from '@src/auth/applications/use-cases/login.use-case';
import { InvalidCredentialsError } from '@src/auth/applications/errors/invalid-credentials.error';
import { AuthenticationForbiddenError } from '@src/auth/applications/errors/authentication-forbidden.error';
import { UserStatusEnum } from '@src/user/domains/entities/user.entity';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;

  const authenticationRepositoryMock: jest.Mocked<AuthenticationRepository> = {
    findIdentityByEmail: jest.fn(),
    createSession: jest.fn(),
  };

  const passwordVerifierMock: jest.Mocked<PasswordVerifier> = {
    verify: jest.fn(),
  };

  const accessTokenIssuerMock: jest.Mocked<AccessTokenIssuer> = {
    issue: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginUseCase,
        {
          provide: AUTHENTICATION_REPOSITORY,
          useValue: authenticationRepositoryMock,
        },
        {
          provide: PASSWORD_VERIFIER,
          useValue: passwordVerifierMock,
        },
        {
          provide: ACCESS_TOKEN_ISSUER,
          useValue: accessTokenIssuerMock,
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
      authenticationRepositoryMock.findIdentityByEmail.mockResolvedValue(null);

      await expect(
        useCase.execute({ email: 'john@example.com', password: 'secret' }),
      ).rejects.toThrow(InvalidCredentialsError);
    });

    it('should throw when the password does not match', async () => {
      authenticationRepositoryMock.findIdentityByEmail.mockResolvedValue(
        buildIdentity(),
      );
      passwordVerifierMock.verify.mockResolvedValue(false);

      await expect(
        useCase.execute({ email: 'john@example.com', password: 'secret' }),
      ).rejects.toThrow(InvalidCredentialsError);
    });

    it('should block login for pending email verification', async () => {
      authenticationRepositoryMock.findIdentityByEmail.mockResolvedValue(
        buildIdentity({
          user: { status: UserStatusEnum.PENDING_EMAIL_VERIFICATION },
        }),
      );
      passwordVerifierMock.verify.mockResolvedValue(true);

      await expect(
        useCase.execute({ email: 'john@example.com', password: 'secret' }),
      ).rejects.toThrow(AuthenticationForbiddenError);
    });

    it('should block login for suspended users', async () => {
      authenticationRepositoryMock.findIdentityByEmail.mockResolvedValue(
        buildIdentity({
          user: { status: UserStatusEnum.SUSPENDED },
        }),
      );
      passwordVerifierMock.verify.mockResolvedValue(true);

      await expect(
        useCase.execute({ email: 'john@example.com', password: 'secret' }),
      ).rejects.toThrow('user account is suspended');
    });

    it('should block login for deactivated users', async () => {
      authenticationRepositoryMock.findIdentityByEmail.mockResolvedValue(
        buildIdentity({
          user: { status: UserStatusEnum.DEACTIVATED },
        }),
      );
      passwordVerifierMock.verify.mockResolvedValue(true);

      await expect(
        useCase.execute({ email: 'john@example.com', password: 'secret' }),
      ).rejects.toThrow('user account is deactivated');
    });

    it('should block login for banned users', async () => {
      authenticationRepositoryMock.findIdentityByEmail.mockResolvedValue(
        buildIdentity({
          user: { status: UserStatusEnum.BANNED },
        }),
      );
      passwordVerifierMock.verify.mockResolvedValue(true);

      await expect(
        useCase.execute({ email: 'john@example.com', password: 'secret' }),
      ).rejects.toThrow('user account is banned');
    });

    it('should block login for unknown statuses', async () => {
      authenticationRepositoryMock.findIdentityByEmail.mockResolvedValue(
        buildIdentity({
          user: { status: 'unknown' as UserStatusEnum },
        }),
      );
      passwordVerifierMock.verify.mockResolvedValue(true);

      await expect(
        useCase.execute({ email: 'john@example.com', password: 'secret' }),
      ).rejects.toThrow(AuthenticationForbiddenError);
    });
  });

  describe('session creation', () => {
    it('should create a session and return the access token', async () => {
      authenticationRepositoryMock.findIdentityByEmail.mockResolvedValue(
        buildIdentity(),
      );
      passwordVerifierMock.verify.mockResolvedValue(true);
      authenticationRepositoryMock.createSession.mockResolvedValue();
      accessTokenIssuerMock.issue.mockResolvedValue('token');

      await expect(
        useCase.execute({
          email: 'john@example.com',
          password: 'secret',
          client: { browser: 'Chrome' },
        }),
      ).resolves.toEqual({
        accessToken: 'token',
        user: {
          id: 'user-id',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          status: UserStatusEnum.ACTIVE,
          productRole: 'candidate',
          adminRole: undefined,
          permissions: undefined,
          isInternal: false,
        },
      });

      expect(
        authenticationRepositoryMock.createSession.mock.calls,
      ).toHaveLength(1);
      expect(accessTokenIssuerMock.issue.mock.calls[0]?.[0]).toEqual({
        sub: 'user-id',
        sid: expect.any(String),
        ver: 1,
        typ: 'product',
        pr: 'candidate',
        ar: undefined,
        perm: undefined,
      });
    });

    it('should issue an internal token for internal users', async () => {
      authenticationRepositoryMock.findIdentityByEmail.mockResolvedValue(
        buildIdentity({
          user: {
            isInternal: true,
            adminRole: 'admin' as never,
            permissions: ['view_users'] as never,
          },
        }),
      );
      passwordVerifierMock.verify.mockResolvedValue(true);
      authenticationRepositoryMock.createSession.mockResolvedValue();
      accessTokenIssuerMock.issue.mockResolvedValue('token');

      await useCase.execute({
        email: 'john@example.com',
        password: 'secret',
      });

      expect(accessTokenIssuerMock.issue.mock.calls[0]?.[0]).toEqual({
        sub: 'user-id',
        sid: expect.any(String),
        ver: 1,
        typ: 'internal',
        pr: 'candidate',
        ar: 'admin',
        perm: ['view_users'],
      });
    });
  });
});

function buildIdentity(
  overrides?: Partial<AuthenticatedIdentity>,
): AuthenticatedIdentity {
  return {
    user: {
      id: 'user-id',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      status: UserStatusEnum.ACTIVE,
      productRole: 'candidate',
      isInternal: false,
    },
    passwordHash: 'hashed',
    tokenVersion: 1,
    ...overrides,
    user: {
      id: 'user-id',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      status: UserStatusEnum.ACTIVE,
      productRole: 'candidate',
      isInternal: false,
      ...overrides?.user,
    },
  };
}
