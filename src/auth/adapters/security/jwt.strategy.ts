import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  AUTHENTICATION_SESSION_REPOSITORY,
  type AuthenticationSessionRepository,
} from '@src/auth/domains/repositories/authentication-session.repository';
import type { AuthenticatedUser } from '@src/auth/adapters/security/authenticated-user.interface';
import type { AccessTokenType } from '@src/auth/domains/services/access-token-issuer';
import {
  AdminPermissionEnum,
  AdminRoleEnum,
  ProductPermissionEnum,
  ProductRoleEnum,
  UserStatusEnum,
} from '@src/user/domains/entities/user.entity';

interface JwtStrategyPayload {
  sub: string;
  sid?: string;
  ver?: number;
  typ?: AccessTokenType;
  pr?: string;
  pperm?: string[];
  ar?: string;
  aperm?: string[];
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

    if ((identity.user.status as UserStatusEnum) !== UserStatusEnum.ACTIVE) {
      throw new UnauthorizedException(
        'user is not allowed to access this resource',
      );
    }

    if (!identity.user.id) {
      throw new UnauthorizedException('user id missing');
    }

    return {
      id: identity.user.id,
      firstName: identity.user.firstName,
      lastName: identity.user.lastName,
      email: identity.user.email,
      status: identity.user.status as UserStatusEnum,
      productRole: identity.user.productRole as ProductRoleEnum | undefined,
      productPermissions: identity.user.productPermissions as
        | ProductPermissionEnum[]
        | undefined,
      adminRole: identity.user.adminRole as AdminRoleEnum | undefined,
      adminPermissions: (identity.user.adminPermissions ??
        identity.user.permissions) as AdminPermissionEnum[] | undefined,
      permissions: (identity.user.adminPermissions ??
        identity.user.permissions) as AdminPermissionEnum[] | undefined,
      isInternal: identity.user.isInternal,
      sessionId: payload.sid,
      tokenVersion: identity.tokenVersion,
    };
  }
}
