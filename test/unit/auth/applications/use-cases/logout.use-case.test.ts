import { Test, TestingModule } from '@nestjs/testing';
import {
  AUTHENTICATION_SESSION_REPOSITORY,
  type AuthenticationSessionRepository,
} from '@src/auth/domains/repositories/authentication-session.repository';
import {
  ACCESS_TOKEN_VERIFIER,
  type AccessTokenVerifier,
} from '@src/auth/domains/services/access-token-verifier';
import { LogoutUseCase } from '@src/auth/applications/use-cases/logout.use-case';
import { InvalidAuthorizationHeaderError } from '@src/auth/applications/errors/invalid-authorization-header.error';
import { InvalidTokenError } from '@src/auth/applications/errors/invalid-token.error';

describe('LogoutUseCase', () => {
  let useCase: LogoutUseCase;

  const authenticationSessionRepositoryMock: jest.Mocked<AuthenticationSessionRepository> =
    {
      findIdentityById: jest.fn(),
      incrementTokenVersion: jest.fn(),
      deactivateSession: jest.fn(),
    };

  const accessTokenVerifierMock: jest.Mocked<AccessTokenVerifier> = {
    verify: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogoutUseCase,
        {
          provide: AUTHENTICATION_SESSION_REPOSITORY,
          useValue: authenticationSessionRepositoryMock,
        },
        {
          provide: ACCESS_TOKEN_VERIFIER,
          useValue: accessTokenVerifierMock,
        },
      ],
    }).compile();

    useCase = module.get<LogoutUseCase>(LogoutUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('authorization validation', () => {
    it('should throw when authorization header is missing', async () => {
      await expect(useCase.execute({})).rejects.toThrow(
        InvalidAuthorizationHeaderError,
      );
    });

    it('should throw when authorization header format is invalid', async () => {
      await expect(
        useCase.execute({ authorization: 'Invalid token' }),
      ).rejects.toThrow(InvalidAuthorizationHeaderError);
    });
  });

  describe('token validation', () => {
    it('should throw when the token is invalid', async () => {
      accessTokenVerifierMock.verify.mockRejectedValue(new InvalidTokenError());

      await expect(
        useCase.execute({ authorization: 'Bearer token' }),
      ).rejects.toThrow(InvalidTokenError);
    });
  });

  describe('session invalidation', () => {
    it('should throw when the user from the token is not found', async () => {
      accessTokenVerifierMock.verify.mockResolvedValue({
        sub: 'user-id',
        sid: 'session-id',
        ver: 1,
      });
      authenticationSessionRepositoryMock.findIdentityById.mockResolvedValue(
        null,
      );

      await expect(
        useCase.execute({ authorization: 'Bearer token' }),
      ).rejects.toThrow(InvalidTokenError);
    });

    it('should throw when the token version is outdated', async () => {
      accessTokenVerifierMock.verify.mockResolvedValue({
        sub: 'user-id',
        sid: 'session-id',
        ver: 1,
      });
      authenticationSessionRepositoryMock.findIdentityById.mockResolvedValue({
        user: {
          id: 'user-id',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          status: 'active',
        },
        tokenVersion: 2,
      } as never);

      await expect(
        useCase.execute({ authorization: 'Bearer token' }),
      ).rejects.toThrow(InvalidTokenError);
    });

    it('should throw when the payload does not contain a session id', async () => {
      accessTokenVerifierMock.verify.mockResolvedValue({
        sub: 'user-id',
        ver: 1,
      });
      authenticationSessionRepositoryMock.findIdentityById.mockResolvedValue({
        user: {
          id: 'user-id',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          status: 'active',
        },
        tokenVersion: 1,
      } as never);

      await expect(
        useCase.execute({ authorization: 'Bearer token' }),
      ).rejects.toThrow(InvalidTokenError);
    });

    it('should throw when the active session is not found', async () => {
      accessTokenVerifierMock.verify.mockResolvedValue({
        sub: 'user-id',
        sid: 'session-id',
        ver: 1,
      });
      authenticationSessionRepositoryMock.findIdentityById.mockResolvedValue({
        user: {
          id: 'user-id',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          status: 'active',
        },
        tokenVersion: 1,
      } as never);
      authenticationSessionRepositoryMock.deactivateSession.mockResolvedValue(
        false,
      );

      await expect(
        useCase.execute({ authorization: 'Bearer token' }),
      ).rejects.toThrow(InvalidTokenError);
    });

    it('should deactivate the session and invalidate the token version', async () => {
      accessTokenVerifierMock.verify.mockResolvedValue({
        sub: 'user-id',
        sid: 'session-id',
        ver: 1,
      });
      authenticationSessionRepositoryMock.findIdentityById.mockResolvedValue({
        user: {
          id: 'user-id',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          status: 'active',
        },
        tokenVersion: 1,
      } as never);
      authenticationSessionRepositoryMock.deactivateSession.mockResolvedValue(
        true,
      );
      authenticationSessionRepositoryMock.incrementTokenVersion.mockResolvedValue();

      await expect(
        useCase.execute({ authorization: 'Bearer token' }),
      ).resolves.toEqual({ success: true });

      expect(
        authenticationSessionRepositoryMock.deactivateSession.mock.calls,
      ).toHaveLength(1);
      expect(
        authenticationSessionRepositoryMock.incrementTokenVersion.mock.calls[0],
      ).toEqual(['user-id']);
    });
  });
});
