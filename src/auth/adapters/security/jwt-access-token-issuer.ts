import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type {
  AccessTokenIssuer,
  AccessTokenPayload,
} from '@src/auth/domains/services/access-token-issuer';

@Injectable()
export class JwtAccessTokenIssuer implements AccessTokenIssuer {
  constructor(private readonly jwtService: JwtService) {}

  async issue(payload: AccessTokenPayload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
