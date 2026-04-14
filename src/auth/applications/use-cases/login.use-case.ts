import { Inject, Injectable } from '@nestjs/common';
import {
  type LoginRequest,
  type LoginResponse,
  type LoginUseCaseInterface,
} from '@src/auth/applications/contracts/login.use-case-interface';
import {
  AUTHENTICATION_REPOSITORY,
  type AuthenticationRepository,
} from '@src/auth/domains/repositories/authentication.repository';
import {
  ACCESS_TOKEN_ISSUER,
  type AccessTokenType,
  type AccessTokenIssuer,
} from '@src/auth/domains/services/access-token-issuer';
import {
  PASSWORD_VERIFIER,
  type PasswordVerifier,
} from '@src/auth/domains/services/password-verifier';
import { InvalidCredentialsError } from '@src/auth/applications/errors/invalid-credentials.error';
import { AuthenticationForbiddenError } from '@src/auth/applications/errors/authentication-forbidden.error';
import { UserStatusEnum } from '@src/user/domains/entities/user.entity';

@Injectable()
export class LoginUseCase implements LoginUseCaseInterface {
  constructor(
    @Inject(AUTHENTICATION_REPOSITORY)
    private readonly authenticationRepository: AuthenticationRepository,
    @Inject(PASSWORD_VERIFIER)
    private readonly passwordVerifier: PasswordVerifier,
    @Inject(ACCESS_TOKEN_ISSUER)
    private readonly accessTokenIssuer: AccessTokenIssuer,
  ) {}

  async execute(data: LoginRequest): Promise<LoginResponse> {
    const identity = await this.authenticationRepository.findIdentityByEmail(
      data.email,
    );

    if (!identity) {
      throw new InvalidCredentialsError();
    }

    const passwordMatches = await this.passwordVerifier.verify(
      data.password,
      identity.passwordHash,
    );

    if (!passwordMatches) {
      throw new InvalidCredentialsError();
    }

    this.ensureUserCanAuthenticate(identity.user.status);

    const createdAt = new Date();
    const sessionId = `${identity.user.id}-${Date.now()}`;

    await this.authenticationRepository.createSession({
      userId: identity.user.id,
      sessionId,
      client: data.client,
      active: true,
      createdAt,
      startedAt: createdAt,
    });

    const accessToken = await this.accessTokenIssuer.issue({
      sub: identity.user.id,
      sid: sessionId,
      ver: identity.tokenVersion,
      typ: this.resolveTokenType(identity.user.isInternal),
      pr: identity.user.productRole,
      pperm: identity.user.productPermissions,
      ar: identity.user.adminRole,
      aperm: identity.user.adminPermissions ?? identity.user.permissions,
      perm: identity.user.adminPermissions ?? identity.user.permissions,
    });

    return {
      accessToken,
      user: {
        id: identity.user.id,
        firstName: identity.user.firstName,
        lastName: identity.user.lastName,
        email: identity.user.email,
        status: identity.user.status,
        productRole: identity.user.productRole,
        productPermissions: identity.user.productPermissions,
        adminRole: identity.user.adminRole,
        adminPermissions:
          identity.user.adminPermissions ?? identity.user.permissions,
        permissions:
          identity.user.adminPermissions ?? identity.user.permissions,
        isInternal: identity.user.isInternal,
      },
    };
  }

  private ensureUserCanAuthenticate(status: UserStatusEnum): void {
    if (status === UserStatusEnum.ACTIVE) {
      return;
    }

    switch (status) {
      case UserStatusEnum.PENDING_ACCOUNT_CONFIRMATION:
        throw new AuthenticationForbiddenError('Email verification pending!');
      case UserStatusEnum.SUSPENDED:
        throw new AuthenticationForbiddenError('User account is suspended!');
      case UserStatusEnum.DEACTIVATED:
        throw new AuthenticationForbiddenError('User account is deactivated!');
      case UserStatusEnum.BANNED:
        throw new AuthenticationForbiddenError('User account is banned');
      default:
        throw new AuthenticationForbiddenError();
    }
  }

  private resolveTokenType(isInternal?: boolean): AccessTokenType {
    return isInternal ? 'internal' : 'product';
  }
}
