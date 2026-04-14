import { Inject, Injectable } from '@nestjs/common';
import {
  type LogoutRequest,
  type LogoutResponse,
  type LogoutUseCaseInterface,
} from '@src/auth/applications/contracts/logout.use-case-interface';
import {
  AUTHENTICATION_SESSION_REPOSITORY,
  type AuthenticationSessionRepository,
} from '@src/auth/domains/repositories/authentication-session.repository';
import {
  ACCESS_TOKEN_VERIFIER,
  type AccessTokenVerifier,
} from '@src/auth/domains/services/access-token-verifier';
import { InvalidAuthorizationHeaderError } from '@src/auth/applications/errors/invalid-authorization-header.error';
import { InvalidTokenError } from '@src/auth/applications/errors/invalid-token.error';

@Injectable()
export class LogoutUseCase implements LogoutUseCaseInterface {
  constructor(
    @Inject(AUTHENTICATION_SESSION_REPOSITORY)
    private readonly authenticationSessionRepository: AuthenticationSessionRepository,
    @Inject(ACCESS_TOKEN_VERIFIER)
    private readonly accessTokenVerifier: AccessTokenVerifier,
  ) {}

  async execute(data: LogoutRequest): Promise<LogoutResponse> {
    const updatedAt = new Date();
    const token = this.extractBearerToken(data.authorization);
    const payload = await this.accessTokenVerifier.verify(token);
    const identity =
      await this.authenticationSessionRepository.findIdentityById(payload.sub);

    if (!identity) {
      throw new InvalidTokenError();
    }

    if (payload.ver !== identity.tokenVersion) {
      throw new InvalidTokenError('token already invalidated');
    }

    if (!payload.sid) {
      throw new InvalidTokenError();
    }

    if (!identity.user.id) {
      throw new InvalidTokenError();
    }

    const sessionWasClosed =
      await this.authenticationSessionRepository.deactivateSession(
        identity.user.id,
        payload.sid,
        updatedAt,
      );

    if (!sessionWasClosed) {
      throw new InvalidTokenError('active session not found');
    }

    await this.authenticationSessionRepository.incrementTokenVersion(
      identity.user.id,
    );

    return { success: true };
  }

  private extractBearerToken(authorization?: string): string {
    if (!authorization) {
      throw new InvalidAuthorizationHeaderError(
        'authorization header is required',
      );
    }

    const [scheme, token] = authorization.split(' ');

    if (scheme !== 'Bearer' || !token) {
      throw new InvalidAuthorizationHeaderError();
    }

    return token;
  }
}
