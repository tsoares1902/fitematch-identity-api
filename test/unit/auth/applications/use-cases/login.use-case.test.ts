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
import {
  AdminRoleEnum,
  AdminPermissionEnum,
  ProductPermissionEnum,
  ProductRoleEnum,
  UserStatusEnum,
} from '@src/user/domains/entities/user.entity';

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

    it('should block login for pending account confirmation', async () => {
      authenticationRepositoryMock.findIdentityByEmail.mockResolvedValue(
        buildIdentity({
          user: { status: UserStatusEnum.PENDING_ACCOUNT_CONFIRMATION },
        }),
      );
      passwordVerifierMock.verify.mockResolvedValue(true);

      await expect(
        useCase.execute({ email: 'john@example.com', password: 'secret' }),
      ).rejects.toThrow('Email verification pending!');
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
      ).rejects.toThrow('User account is suspended!');
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
      ).rejects.toThrow('User account is deactivated!');
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
      ).rejects.toThrow('User account is banned');
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
    it('should create a product session and return the access token', async () => {
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
          productRole: ProductRoleEnum.CANDIDATE,
          productPermissions: [ProductPermissionEnum.VIEW_OWN_USER],
          adminRole: undefined,
          adminPermissions: undefined,
          permissions: undefined,
          isInternal: false,
        },
      });

      expect(
        authenticationRepositoryMock.createSession.mock.calls[0]?.[0],
      ).toEqual({
        userId: 'user-id',
        sessionId: expect.any(String),
        client: { browser: 'Chrome' },
        active: true,
        createdAt: expect.any(Date),
        startedAt: expect.any(Date),
      });
      expect(accessTokenIssuerMock.issue.mock.calls[0]?.[0]).toEqual({
        sub: 'user-id',
        sid: expect.any(String),
        ver: 1,
        typ: 'product',
        pr: ProductRoleEnum.CANDIDATE,
        pperm: [ProductPermissionEnum.VIEW_OWN_USER],
        ar: undefined,
        aperm: undefined,
        perm: undefined,
      });
    });

    it('should issue an internal token using admin permissions fallback', async () => {
      authenticationRepositoryMock.findIdentityByEmail.mockResolvedValue(
        buildIdentity({
          user: {
            isInternal: true,
            adminRole: AdminRoleEnum.ADMIN,
            permissions: [AdminPermissionEnum.VIEW_USERS],
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
        pr: ProductRoleEnum.CANDIDATE,
        pperm: [ProductPermissionEnum.VIEW_OWN_USER],
        ar: AdminRoleEnum.ADMIN,
        aperm: [AdminPermissionEnum.VIEW_USERS],
        perm: [AdminPermissionEnum.VIEW_USERS],
      });
    });

    it('should prefer adminPermissions over legacy permissions', async () => {
      authenticationRepositoryMock.findIdentityByEmail.mockResolvedValue(
        buildIdentity({
          user: {
            isInternal: true,
            adminRole: AdminRoleEnum.ADMIN,
            adminPermissions: [AdminPermissionEnum.EDIT_USERS],
            permissions: [AdminPermissionEnum.VIEW_USERS],
          },
        }),
      );
      passwordVerifierMock.verify.mockResolvedValue(true);
      authenticationRepositoryMock.createSession.mockResolvedValue();
      accessTokenIssuerMock.issue.mockResolvedValue('token');

      await expect(
        useCase.execute({
          email: 'john@example.com',
          password: 'secret',
        }),
      ).resolves.toMatchObject({
        user: {
          adminPermissions: [AdminPermissionEnum.EDIT_USERS],
          permissions: [AdminPermissionEnum.EDIT_USERS],
        },
      });

      expect(accessTokenIssuerMock.issue.mock.calls[0]?.[0]).toEqual({
        sub: 'user-id',
        sid: expect.any(String),
        ver: 1,
        typ: 'internal',
        pr: ProductRoleEnum.CANDIDATE,
        pperm: [ProductPermissionEnum.VIEW_OWN_USER],
        ar: AdminRoleEnum.ADMIN,
        aperm: [AdminPermissionEnum.EDIT_USERS],
        perm: [AdminPermissionEnum.EDIT_USERS],
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
      productRole: ProductRoleEnum.CANDIDATE,
      productPermissions: [ProductPermissionEnum.VIEW_OWN_USER],
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
      productRole: ProductRoleEnum.CANDIDATE,
      productPermissions: [ProductPermissionEnum.VIEW_OWN_USER],
      isInternal: false,
      ...overrides?.user,
    },
  };
}
