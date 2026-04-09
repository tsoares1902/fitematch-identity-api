import type {
  AdminRoleEnum,
  PermissionEnum,
  ProductRoleEnum,
} from '@src/user/domains/entities/user.entity';
import type { AccessTokenType } from './access-token-issuer';

export const ACCESS_TOKEN_VERIFIER = 'ACCESS_TOKEN_VERIFIER';

export interface VerifiedAccessTokenPayload {
  sub: string;
  sid?: string;
  ver?: number;
  typ?: AccessTokenType;
  pr?: ProductRoleEnum;
  ar?: AdminRoleEnum;
  perm?: PermissionEnum[];
}

export interface AccessTokenVerifier {
  verify(token: string): Promise<VerifiedAccessTokenPayload>;
}
