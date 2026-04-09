import { Inject, Injectable } from '@nestjs/common';
import {
  type ForgotPasswordRequest,
  type ForgotPasswordResponse,
  type ForgotPasswordUseCaseInterface,
} from '@src/auth/applications/contracts/forgot-password.use-case-interface';
import {
  ACCOUNT_RECOVERY_REPOSITORY,
  type AccountRecoveryRepository,
} from '@src/auth/domains/repositories/account-recovery.repository';
import {
  AUTH_NOTIFICATION_SERVICE,
  type AuthNotificationService,
} from '@src/auth/domains/services/auth-notification.service';
import {
  ONE_TIME_TOKEN_SERVICE,
  type OneTimeTokenService,
} from '@src/auth/domains/services/one-time-token.service';

@Injectable()
export class ForgotPasswordUseCase implements ForgotPasswordUseCaseInterface {
  constructor(
    @Inject(ACCOUNT_RECOVERY_REPOSITORY)
    private readonly accountRecoveryRepository: AccountRecoveryRepository,
    @Inject(ONE_TIME_TOKEN_SERVICE)
    private readonly oneTimeTokenService: OneTimeTokenService,
    @Inject(AUTH_NOTIFICATION_SERVICE)
    private readonly authNotificationService: AuthNotificationService,
  ) {}

  async execute(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    const identity =
      await this.accountRecoveryRepository.findRecoveryIdentityByEmail(
        data.email,
      );

    if (!identity) {
      return { success: true };
    }

    const token = this.oneTimeTokenService.generate();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 30);

    await this.accountRecoveryRepository.storePasswordResetToken(
      identity.userId,
      token.tokenHash,
      expiresAt,
    );

    await this.authNotificationService.sendPasswordResetEmail({
      email: identity.email,
      firstName: identity.firstName,
      token: token.rawToken,
    });

    return { success: true };
  }
}
