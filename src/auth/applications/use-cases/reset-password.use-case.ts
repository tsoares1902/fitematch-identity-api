import { Inject, Injectable } from '@nestjs/common';
import {
  type ResetPasswordRequest,
  type ResetPasswordResponse,
  type ResetPasswordUseCaseInterface,
} from '@src/auth/applications/contracts/reset-password.use-case-interface';
import {
  ACCOUNT_RECOVERY_REPOSITORY,
  type AccountRecoveryRepository,
} from '@src/auth/domains/repositories/account-recovery.repository';
import {
  ONE_TIME_TOKEN_SERVICE,
  type OneTimeTokenService,
} from '@src/auth/domains/services/one-time-token.service';
import { InvalidPasswordResetTokenError } from '@src/auth/applications/errors/invalid-password-reset-token.error';
import EncryptUtils from '@src/shared/applications/utils/encrypt.utils';

@Injectable()
export class ResetPasswordUseCase implements ResetPasswordUseCaseInterface {
  /* istanbul ignore next */
  constructor(
    @Inject(ACCOUNT_RECOVERY_REPOSITORY)
    private readonly accountRecoveryRepository: AccountRecoveryRepository,
    private readonly encryptUtils: EncryptUtils,
    @Inject(ONE_TIME_TOKEN_SERVICE)
    private readonly oneTimeTokenService: OneTimeTokenService,
  ) {}

  async execute(data: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    const tokenHash = this.oneTimeTokenService.generateFromRaw(data.token);
    const passwordHash = await this.encryptUtils.encryptPassword(
      data.newPassword,
    );
    const passwordWasReset = await this.accountRecoveryRepository.resetPassword(
      tokenHash,
      passwordHash,
      new Date(),
    );

    if (!passwordWasReset) {
      throw new InvalidPasswordResetTokenError();
    }

    return { success: true };
  }
}
