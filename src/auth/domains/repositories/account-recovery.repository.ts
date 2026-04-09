export const ACCOUNT_RECOVERY_REPOSITORY = 'ACCOUNT_RECOVERY_REPOSITORY';

export interface AccountRecoveryIdentity {
  userId: string;
  email: string;
  firstName: string;
  emailVerifiedAt?: string;
}

export interface AccountRecoveryRepository {
  findRecoveryIdentityByEmail(
    email: string,
  ): Promise<AccountRecoveryIdentity | null>;
  storePasswordResetToken(
    userId: string,
    tokenHash: string,
    expiresAt: Date,
  ): Promise<void>;
  resetPassword(
    tokenHash: string,
    passwordHash: string,
    updatedAt: Date,
  ): Promise<boolean>;
  storeEmailVerificationToken(
    userId: string,
    tokenHash: string,
    expiresAt: Date,
  ): Promise<void>;
  verifyEmail(tokenHash: string, verifiedAt: string): Promise<boolean>;
}
