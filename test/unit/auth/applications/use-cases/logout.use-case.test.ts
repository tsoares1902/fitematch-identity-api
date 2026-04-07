import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { LOGIN_REPOSITORY } from '@src/auth/applications/contracts/login.repository-interface';
import { LogoutUseCase } from '@src/auth/applications/use-cases/logout.use-case';

describe('LogoutUseCase', () => {
  let useCase: LogoutUseCase;

  const loginRepositoryMock = {
    findById: jest.fn(),
    deactivateSession: jest.fn(),
    incrementTokenVersion: jest.fn(),
  };

  const jwtServiceMock = {
    verifyAsync: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogoutUseCase,
        {
          provide: LOGIN_REPOSITORY,
          useValue: loginRepositoryMock,
        },
        {
          provide: JwtService,
          useValue: jwtServiceMock,
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
      await expect(useCase.execute({})).rejects.toThrow(UnauthorizedException);
    });

    it('should throw when authorization header format is invalid', async () => {
      await expect(
        useCase.execute({ authorization: 'Invalid token' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('token validation', () => {
    it('should throw when the token is invalid', async () => {
      jwtServiceMock.verifyAsync.mockRejectedValue(new Error('invalid'));

      await expect(
        useCase.execute({ authorization: 'Bearer token' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw when the decoded payload is invalid', async () => {
      jwtServiceMock.verifyAsync.mockResolvedValue('invalid-payload');

      await expect(
        useCase.execute({ authorization: 'Bearer token' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('session invalidation', () => {
    it('should throw when the user from the token is not found', async () => {
      jwtServiceMock.verifyAsync.mockResolvedValue({
        sub: 'user-id',
        sessionId: 'session-id',
        tokenVersion: 1,
      });
      loginRepositoryMock.findById.mockResolvedValue(null);

      await expect(
        useCase.execute({ authorization: 'Bearer token' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw when the token version is outdated', async () => {
      jwtServiceMock.verifyAsync.mockResolvedValue({
        sub: 'user-id',
        sessionId: 'session-id',
        tokenVersion: 1,
      });
      loginRepositoryMock.findById.mockResolvedValue({
        id: 'user-id',
        tokenVersion: 2,
      });

      await expect(
        useCase.execute({ authorization: 'Bearer token' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw when the payload does not contain a session id', async () => {
      jwtServiceMock.verifyAsync.mockResolvedValue({
        sub: 'user-id',
        tokenVersion: 1,
      });
      loginRepositoryMock.findById.mockResolvedValue({
        id: 'user-id',
        tokenVersion: 1,
      });

      await expect(
        useCase.execute({ authorization: 'Bearer token' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw when the active session is not found', async () => {
      jwtServiceMock.verifyAsync.mockResolvedValue({
        sub: 'user-id',
        sessionId: 'session-id',
        tokenVersion: 1,
      });
      loginRepositoryMock.findById.mockResolvedValue({
        id: 'user-id',
        tokenVersion: 1,
      });
      loginRepositoryMock.deactivateSession.mockResolvedValue(false);

      await expect(
        useCase.execute({ authorization: 'Bearer token' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should deactivate the session and invalidate the token version', async () => {
      jwtServiceMock.verifyAsync.mockResolvedValue({
        sub: 'user-id',
        sessionId: 'session-id',
        tokenVersion: 1,
      });
      loginRepositoryMock.findById.mockResolvedValue({
        id: 'user-id',
        tokenVersion: 1,
      });
      loginRepositoryMock.deactivateSession.mockResolvedValue(true);
      loginRepositoryMock.incrementTokenVersion.mockResolvedValue(undefined);

      await expect(
        useCase.execute({ authorization: 'Bearer token' }),
      ).resolves.toEqual({ success: true });

      expect(loginRepositoryMock.deactivateSession).toHaveBeenCalled();
      expect(loginRepositoryMock.incrementTokenVersion).toHaveBeenCalledWith(
        'user-id',
      );
    });
  });
});
