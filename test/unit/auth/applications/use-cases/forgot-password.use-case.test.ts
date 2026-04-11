import { Test, TestingModule } from '@nestjs/testing';
import {
  ACCOUNT_RECOVERY_REPOSITORY,
  type AccountRecoveryRepository,
} from '@src/auth/domains/repositories/account-recovery.repository';
import {
  AUTH_NOTIFICATION_SERVICE,
  type AuthNotificationService,
} from '@src/auth/domains/services/auth-notification.service';
import { ForgotPasswordUseCase } from '@src/auth/applications/use-cases/forgot-password.use-case';
import {
  ONE_TIME_TOKEN_SERVICE,
  type OneTimeTokenService,
} from '@src/auth/domains/services/one-time-token.service';

describe('ForgotPasswordUseCase', () => {
  let useCase: ForgotPasswordUseCase;

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
        ForgotPasswordUseCase,
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

    useCase = module.get<ForgotPasswordUseCase>(ForgotPasswordUseCase);
  });

  it('returns success when the identity does not exist', async () => {
    accountRecoveryRepositoryMock.findRecoveryIdentityByEmail.mockResolvedValue(
      null,
    );

    await expect(
      useCase.execute({ email: 'missing@example.com' }),
    ).resolves.toEqual({ success: true });

    expect(oneTimeTokenServiceMock.generate.mock.calls).toHaveLength(0);
    expect(
      accountRecoveryRepositoryMock.storePasswordResetToken.mock.calls,
    ).toHaveLength(0);
    expect(
      authNotificationServiceMock.sendPasswordResetEmail.mock.calls,
    ).toHaveLength(0);
  });

  it('stores the reset token and sends the email when the identity exists', async () => {
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
      accountRecoveryRepositoryMock.storePasswordResetToken.mock.calls,
    ).toEqual([['user-id', 'token-hash', new Date(1_801_000)]]);
    expect(
      authNotificationServiceMock.sendPasswordResetEmail.mock.calls,
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
