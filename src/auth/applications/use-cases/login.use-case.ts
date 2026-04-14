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
import {
  AdminPermissionEnum,
  AdminRoleEnum,
  ProductPermissionEnum,
  ProductRoleEnum,
  UserStatusEnum,
} from '@src/user/domains/entities/user.entity';

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

    const userId = this.requireString(identity.user.id);
    const status = this.toUserStatus(identity.user.status);
    const productRole = this.toOptionalProductRole(identity.user.productRole);
    const productPermissions = this.toOptionalProductPermissions(
      identity.user.productPermissions,
    );
    const adminRole = this.toOptionalAdminRole(identity.user.adminRole);
    const adminPermissions = this.toOptionalAdminPermissions(
      identity.user.adminPermissions ?? identity.user.permissions,
    );

    this.ensureUserCanAuthenticate(status);

    const createdAt = new Date();
    const sessionId = `${userId}-${Date.now()}`;

    await this.authenticationRepository.createSession({
      userId,
      sessionId,
      client: data.client,
      active: true,
      createdAt,
      startedAt: createdAt,
    });

    const accessToken = await this.accessTokenIssuer.issue({
      sub: userId,
      sid: sessionId,
      ver: identity.tokenVersion,
      typ: this.resolveTokenType(identity.user.isInternal),
      pr: productRole,
      pperm: productPermissions,
      ar: adminRole,
      aperm: adminPermissions,
      perm: adminPermissions,
    });

    return {
      accessToken,
      user: {
        id: userId,
        firstName: identity.user.firstName,
        lastName: identity.user.lastName,
        email: identity.user.email,
        status,
        productRole,
        productPermissions,
        adminRole,
        adminPermissions,
        permissions: adminPermissions,
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

  private requireString(value?: string): string {
    if (!value) {
      throw new InvalidCredentialsError();
    }

    return value;
  }

  private toUserStatus(status: string): UserStatusEnum {
    if (Object.values(UserStatusEnum).includes(status as UserStatusEnum)) {
      return status as UserStatusEnum;
    }

    throw new AuthenticationForbiddenError();
  }

  private toOptionalProductRole(role?: string): ProductRoleEnum | undefined {
    if (!role) {
      return undefined;
    }

    if (Object.values(ProductRoleEnum).includes(role as ProductRoleEnum)) {
      return role as ProductRoleEnum;
    }

    throw new AuthenticationForbiddenError();
  }

  private toOptionalProductPermissions(
    permissions?: string[],
  ): ProductPermissionEnum[] | undefined {
    if (!permissions) {
      return undefined;
    }

    if (
      permissions.every((permission) =>
        Object.values(ProductPermissionEnum).includes(
          permission as ProductPermissionEnum,
        ),
      )
    ) {
      return permissions as ProductPermissionEnum[];
    }

    throw new AuthenticationForbiddenError();
  }

  private toOptionalAdminRole(role?: string): AdminRoleEnum | undefined {
    if (!role) {
      return undefined;
    }

    if (Object.values(AdminRoleEnum).includes(role as AdminRoleEnum)) {
      return role as AdminRoleEnum;
    }

    throw new AuthenticationForbiddenError();
  }

  private toOptionalAdminPermissions(
    permissions?: string[],
  ): AdminPermissionEnum[] | undefined {
    if (!permissions) {
      return undefined;
    }

    if (
      permissions.every((permission) =>
        Object.values(AdminPermissionEnum).includes(
          permission as AdminPermissionEnum,
        ),
      )
    ) {
      return permissions as AdminPermissionEnum[];
    }

    throw new AuthenticationForbiddenError();
  }
}
