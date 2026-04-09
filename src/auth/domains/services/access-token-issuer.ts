import type {
  AdminRoleEnum,
  PermissionEnum,
  ProductRoleEnum,
} from '@src/user/domains/entities/user.entity';

export const ACCESS_TOKEN_ISSUER = 'ACCESS_TOKEN_ISSUER';

export type AccessTokenType = 'internal' | 'product';

export interface AccessTokenPayload {
  sub: string;
  sid: string;
  ver: number;
  typ: AccessTokenType;
  pr?: ProductRoleEnum;
  ar?: AdminRoleEnum;
  perm?: PermissionEnum[];
}

export interface AccessTokenIssuer {
  issue(payload: AccessTokenPayload): Promise<string>;
}
