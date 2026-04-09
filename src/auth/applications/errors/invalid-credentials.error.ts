export class InvalidCredentialsError extends Error {
  constructor(message = 'invalid credentials') {
    super(message);
    this.name = 'InvalidCredentialsError';
  }
}
