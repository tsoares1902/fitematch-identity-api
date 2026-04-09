import { Inject, Injectable } from '@nestjs/common';
import {
  type VerifyEmailRequest,
  type VerifyEmailResponse,
  type VerifyEmailUseCaseInterface,
} from '@src/auth/applications/contracts/verify-email.use-case-interface';
import {
  ACCOUNT_RECOVERY_REPOSITORY,
  type AccountRecoveryRepository,
} from '@src/auth/domains/repositories/account-recovery.repository';
import {
  ONE_TIME_TOKEN_SERVICE,
  type OneTimeTokenService,
} from '@src/auth/domains/services/one-time-token.service';
import { InvalidEmailVerificationTokenError } from '@src/auth/applications/errors/invalid-email-verification-token.error';

@Injectable()
export class VerifyEmailUseCase implements VerifyEmailUseCaseInterface {
  constructor(
    @Inject(ACCOUNT_RECOVERY_REPOSITORY)
    private readonly accountRecoveryRepository: AccountRecoveryRepository,
    @Inject(ONE_TIME_TOKEN_SERVICE)
    private readonly oneTimeTokenService: OneTimeTokenService,
  ) {}

  async execute(data: VerifyEmailRequest): Promise<VerifyEmailResponse> {
    const tokenHash = this.oneTimeTokenService.generateFromRaw(data.token);
    const verified = await this.accountRecoveryRepository.verifyEmail(
      tokenHash,
      new Date().toISOString(),
    );

    if (!verified) {
      throw new InvalidEmailVerificationTokenError();
    }

    return { success: true };
  }
}
