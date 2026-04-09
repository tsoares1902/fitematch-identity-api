export class InvalidTokenError extends Error {
  constructor(message = 'invalid token') {
    super(message);
    this.name = 'InvalidTokenError';
  }
}
