import type {
  AdminPermissionEnum,
  AdminRoleEnum,
  ProductPermissionEnum,
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
  pperm?: ProductPermissionEnum[];
  ar?: AdminRoleEnum;
  aperm?: AdminPermissionEnum[];
  perm?: AdminPermissionEnum[];
}

export interface AccessTokenIssuer {
  issue(payload: AccessTokenPayload): Promise<string>;
}
