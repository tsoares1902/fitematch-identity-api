export class InvalidAuthorizationHeaderError extends Error {
  constructor(message = 'invalid authorization header') {
    super(message);
    this.name = 'InvalidAuthorizationHeaderError';
  }
}
