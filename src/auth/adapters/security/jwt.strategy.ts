import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  AUTHENTICATION_SESSION_REPOSITORY,
  type AuthenticationSessionRepository,
} from '@src/auth/domains/repositories/authentication-session.repository';
import type { AuthenticatedUser } from '@src/auth/adapters/security/authenticated-user.interface';
import { Inject } from '@nestjs/common';
import { UserStatusEnum } from '@src/user/domains/entities/user.entity';
import type { AccessTokenType } from '@src/auth/domains/services/access-token-issuer';

interface JwtStrategyPayload {
  sub: string;
  sid?: string;
  ver?: number;
  typ?: AccessTokenType;
  pr?: string;
  ar?: string;
  perm?: string[];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AUTHENTICATION_SESSION_REPOSITORY)
    private readonly authenticationSessionRepository: AuthenticationSessionRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET ?? 'dev-secret-change-me',
    });
  }

  async validate(payload: JwtStrategyPayload): Promise<AuthenticatedUser> {
    const identity =
      await this.authenticationSessionRepository.findIdentityById(payload.sub);

    if (!identity) {
      throw new UnauthorizedException('invalid token');
    }

    if (payload.ver !== undefined && identity.tokenVersion !== payload.ver) {
      throw new UnauthorizedException('token version mismatch');
    }

    if (identity.user.status !== UserStatusEnum.ACTIVE) {
      throw new UnauthorizedException(
        'user is not allowed to access this resource',
      );
    }

    return {
      id: identity.user.id,
      email: identity.user.email,
      firstName: identity.user.firstName,
      lastName: identity.user.lastName,
      status: identity.user.status,
      productRole: identity.user.productRole,
      adminRole: identity.user.adminRole,
      permissions: identity.user.permissions,
      isInternal: identity.user.isInternal,
      sessionId: payload.sid,
      tokenVersion: identity.tokenVersion,
    };
  }
}
