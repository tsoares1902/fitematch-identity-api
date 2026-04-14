import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type {
  AccessTokenVerifier,
  VerifiedAccessTokenPayload,
} from '@src/auth/domains/services/access-token-verifier';
import { InvalidTokenError } from '@src/auth/applications/errors/invalid-token.error';

@Injectable()
export class JwtAccessTokenVerifier implements AccessTokenVerifier {
  constructor(private readonly jwtService: JwtService) {}

  async verify(token: string): Promise<VerifiedAccessTokenPayload> {
    try {
      const payload: unknown = await this.jwtService.verifyAsync(token);

      if (!this.isVerifiedAccessTokenPayload(payload)) {
        throw new InvalidTokenError();
      }

      return payload;
    } catch (error) {
      if (error instanceof InvalidTokenError) {
        throw error;
      }

      throw new InvalidTokenError();
    }
  }

  private isVerifiedAccessTokenPayload(
    payload: unknown,
  ): payload is VerifiedAccessTokenPayload {
    if (typeof payload !== 'object' || payload === null) {
      return false;
    }

    const candidate = payload as Record<string, unknown>;

    return (
      typeof candidate.sub === 'string' &&
      (candidate.sid === undefined || typeof candidate.sid === 'string') &&
      (candidate.ver === undefined || typeof candidate.ver === 'number') &&
      (candidate.typ === undefined ||
        candidate.typ === 'internal' ||
        candidate.typ === 'product') &&
      (candidate.pr === undefined || typeof candidate.pr === 'string') &&
      (candidate.pperm === undefined ||
        (Array.isArray(candidate.pperm) &&
          candidate.pperm.every(
            (permission) => typeof permission === 'string',
          ))) &&
      (candidate.ar === undefined || typeof candidate.ar === 'string') &&
      (candidate.aperm === undefined ||
        (Array.isArray(candidate.aperm) &&
          candidate.aperm.every(
            (permission) => typeof permission === 'string',
          ))) &&
      (candidate.perm === undefined ||
        (Array.isArray(candidate.perm) &&
          candidate.perm.every((permission) => typeof permission === 'string')))
    );
  }
}
