export class InvalidPasswordResetTokenError extends Error {
  constructor(message = 'invalid or expired password reset token') {
    super(message);
    this.name = 'InvalidPasswordResetTokenError';
  }
}
