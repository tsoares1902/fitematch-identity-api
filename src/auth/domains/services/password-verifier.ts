export const PASSWORD_VERIFIER = 'PASSWORD_VERIFIER';

export interface PasswordVerifier {
  verify(plainText: string, passwordHash: string): Promise<boolean>;
}
