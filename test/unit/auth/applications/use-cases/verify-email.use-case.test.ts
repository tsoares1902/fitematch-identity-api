import { Test, TestingModule } from '@nestjs/testing';
import {
  ACCOUNT_RECOVERY_REPOSITORY,
  type AccountRecoveryRepository,
} from '@src/auth/domains/repositories/account-recovery.repository';
import { InvalidEmailVerificationTokenError } from '@src/auth/applications/errors/invalid-email-verification-token.error';
import { VerifyEmailUseCase } from '@src/auth/applications/use-cases/verify-email.use-case';
import {
  ONE_TIME_TOKEN_SERVICE,
  type OneTimeTokenService,
} from '@src/auth/domains/services/one-time-token.service';

describe('VerifyEmailUseCase', () => {
  let useCase: VerifyEmailUseCase;

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

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VerifyEmailUseCase,
        {
          provide: ACCOUNT_RECOVERY_REPOSITORY,
          useValue: accountRecoveryRepositoryMock,
        },
        {
          provide: ONE_TIME_TOKEN_SERVICE,
          useValue: oneTimeTokenServiceMock,
        },
      ],
    }).compile();

    useCase = module.get<VerifyEmailUseCase>(VerifyEmailUseCase);
  });

  it('throws when the verification token is invalid', async () => {
    oneTimeTokenServiceMock.generateFromRaw.mockReturnValue('token-hash');
    accountRecoveryRepositoryMock.verifyEmail.mockResolvedValue(false);

    await expect(useCase.execute({ token: 'raw-token' })).rejects.toThrow(
      InvalidEmailVerificationTokenError,
    );
  });

  it('verifies the email when the token is valid', async () => {
    oneTimeTokenServiceMock.generateFromRaw.mockReturnValue('token-hash');
    accountRecoveryRepositoryMock.verifyEmail.mockResolvedValue(true);

    await expect(useCase.execute({ token: 'raw-token' })).resolves.toEqual({
      success: true,
    });

    expect(accountRecoveryRepositoryMock.verifyEmail.mock.calls[0]?.[0]).toBe(
      'token-hash',
    );
    expect(
      accountRecoveryRepositoryMock.verifyEmail.mock.calls[0]?.[1],
    ).toEqual(expect.any(String));
  });
});
