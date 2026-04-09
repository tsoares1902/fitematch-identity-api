export class AuthenticationForbiddenError extends Error {
  constructor(message = 'user is not allowed to authenticate') {
    super(message);
    this.name = 'AuthenticationForbiddenError';
  }
}
