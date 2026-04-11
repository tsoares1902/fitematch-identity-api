import { Test, TestingModule } from '@nestjs/testing';
import {
  ACCOUNT_RECOVERY_REPOSITORY,
  type AccountRecoveryRepository,
} from '@src/auth/domains/repositories/account-recovery.repository';
import {
  AUTH_NOTIFICATION_SERVICE,
  type AuthNotificationService,
} from '@src/auth/domains/services/auth-notification.service';
import { ResendVerificationEmailUseCase } from '@src/auth/applications/use-cases/resend-verification-email.use-case';
import {
  ONE_TIME_TOKEN_SERVICE,
  type OneTimeTokenService,
} from '@src/auth/domains/services/one-time-token.service';

describe('ResendVerificationEmailUseCase', () => {
  let useCase: ResendVerificationEmailUseCase;

  const accountRecoveryRepositoryMock: jest.Mocked<AccountRecoveryRepository> =
    {
      findRecoveryIdentityByEmail: jest.fn(),
      storePasswordResetToken: jest.fn(),
      storeEmailVerificationToken: jest.fn(),
      resetPassword: jest.fn(),
      verifyEmail: jest.fn(),
    };

  const oneTimeTokenServiceMock: jest.Mocked<OneTimeTokenService> = {
    generate: jest.fn(),
    generateFromRaw: jest.fn(),
  };

  const authNotificationServiceMock: jest.Mocked<AuthNotificationService> = {
    sendPasswordResetEmail: jest.fn(),
    sendEmailVerification: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResendVerificationEmailUseCase,
        {
          provide: ACCOUNT_RECOVERY_REPOSITORY,
          useValue: accountRecoveryRepositoryMock,
        },
        {
          provide: ONE_TIME_TOKEN_SERVICE,
          useValue: oneTimeTokenServiceMock,
        },
        {
          provide: AUTH_NOTIFICATION_SERVICE,
          useValue: authNotificationServiceMock,
        },
      ],
    }).compile();

    useCase = module.get<ResendVerificationEmailUseCase>(
      ResendVerificationEmailUseCase,
    );
  });

  it('returns success when the identity does not exist', async () => {
    accountRecoveryRepositoryMock.findRecoveryIdentityByEmail.mockResolvedValue(
      null,
    );

    await expect(
      useCase.execute({ email: 'missing@example.com' }),
    ).resolves.toEqual({ success: true });

    expect(oneTimeTokenServiceMock.generate.mock.calls).toHaveLength(0);
  });

  it('returns success when the email is already verified', async () => {
    accountRecoveryRepositoryMock.findRecoveryIdentityByEmail.mockResolvedValue(
      {
        userId: 'user-id',
        email: 'john@example.com',
        firstName: 'John',
        emailVerifiedAt: '2026-01-01T00:00:00.000Z',
      },
    );

    await expect(
      useCase.execute({ email: 'john@example.com' }),
    ).resolves.toEqual({ success: true });

    expect(
      accountRecoveryRepositoryMock.storeEmailVerificationToken.mock.calls,
    ).toHaveLength(0);
    expect(
      authNotificationServiceMock.sendEmailVerification.mock.calls,
    ).toHaveLength(0);
  });

  it('stores the verification token and sends the email when the account is pending', async () => {
    const nowSpy = jest.spyOn(Date, 'now').mockReturnValue(1_000);
    accountRecoveryRepositoryMock.findRecoveryIdentityByEmail.mockResolvedValue(
      {
        userId: 'user-id',
        email: 'john@example.com',
        firstName: 'John',
      },
    );
    oneTimeTokenServiceMock.generate.mockReturnValue({
      rawToken: 'raw-token',
      tokenHash: 'token-hash',
    });

    await expect(
      useCase.execute({ email: 'john@example.com' }),
    ).resolves.toEqual({ success: true });

    expect(
      accountRecoveryRepositoryMock.storeEmailVerificationToken.mock.calls,
    ).toEqual([['user-id', 'token-hash', new Date(86_401_000)]]);
    expect(
      authNotificationServiceMock.sendEmailVerification.mock.calls,
    ).toEqual([
      [
        {
          email: 'john@example.com',
          firstName: 'John',
          token: 'raw-token',
        },
      ],
    ]);

    nowSpy.mockRestore();
  });
});
