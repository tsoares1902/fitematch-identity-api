export class InvalidEmailVerificationTokenError extends Error {
  constructor(message = 'invalid or expired email verification token') {
    super(message);
    this.name = 'InvalidEmailVerificationTokenError';
  }
}
