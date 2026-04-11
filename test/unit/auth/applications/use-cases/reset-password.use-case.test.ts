import { Test, TestingModule } from '@nestjs/testing';
import {
  ACCOUNT_RECOVERY_REPOSITORY,
  type AccountRecoveryRepository,
} from '@src/auth/domains/repositories/account-recovery.repository';
import { InvalidPasswordResetTokenError } from '@src/auth/applications/errors/invalid-password-reset-token.error';
import { ResetPasswordUseCase } from '@src/auth/applications/use-cases/reset-password.use-case';
import {
  ONE_TIME_TOKEN_SERVICE,
  type OneTimeTokenService,
} from '@src/auth/domains/services/one-time-token.service';
import EncryptUtils from '@src/shared/applications/utils/encrypt.utils';

describe('ResetPasswordUseCase', () => {
  let useCase: ResetPasswordUseCase;

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

  const encryptUtilsMock = {
    encryptPassword: jest.fn(),
  } as unknown as jest.Mocked<EncryptUtils>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResetPasswordUseCase,
        {
          provide: ACCOUNT_RECOVERY_REPOSITORY,
          useValue: accountRecoveryRepositoryMock,
        },
        {
          provide: ONE_TIME_TOKEN_SERVICE,
          useValue: oneTimeTokenServiceMock,
        },
        {
          provide: EncryptUtils,
          useValue: encryptUtilsMock,
        },
      ],
    }).compile();

    useCase = module.get<ResetPasswordUseCase>(ResetPasswordUseCase);
  });

  it('throws when the password reset token is invalid', async () => {
    oneTimeTokenServiceMock.generateFromRaw.mockReturnValue('token-hash');
    encryptUtilsMock.encryptPassword.mockResolvedValue('password-hash');
    accountRecoveryRepositoryMock.resetPassword.mockResolvedValue(false);

    await expect(
      useCase.execute({ token: 'raw-token', newPassword: 'new-secret' }),
    ).rejects.toThrow(InvalidPasswordResetTokenError);

    expect(accountRecoveryRepositoryMock.resetPassword.mock.calls).toHaveLength(
      1,
    );
  });

  it('resets the password when the token is valid', async () => {
    oneTimeTokenServiceMock.generateFromRaw.mockReturnValue('token-hash');
    encryptUtilsMock.encryptPassword.mockResolvedValue('password-hash');
    accountRecoveryRepositoryMock.resetPassword.mockResolvedValue(true);

    await expect(
      useCase.execute({ token: 'raw-token', newPassword: 'new-secret' }),
    ).resolves.toEqual({ success: true });

    expect(oneTimeTokenServiceMock.generateFromRaw.mock.calls).toEqual([
      ['raw-token'],
    ]);
    expect(encryptUtilsMock.encryptPassword.mock.calls).toEqual([
      ['new-secret'],
    ]);
    expect(accountRecoveryRepositoryMock.resetPassword.mock.calls[0]?.[0]).toBe(
      'token-hash',
    );
    expect(accountRecoveryRepositoryMock.resetPassword.mock.calls[0]?.[1]).toBe(
      'password-hash',
    );
    expect(
      accountRecoveryRepositoryMock.resetPassword.mock.calls[0]?.[2],
    ).toBeInstanceOf(Date);
  });
});
