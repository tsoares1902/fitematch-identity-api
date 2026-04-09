import { Injectable } from '@nestjs/common';
import { createHash, randomBytes } from 'crypto';
import type {
  OneTimeToken,
  OneTimeTokenService,
} from '@src/auth/domains/services/one-time-token.service';

@Injectable()
export class CryptoOneTimeTokenService implements OneTimeTokenService {
  generate(): OneTimeToken {
    const rawToken = randomBytes(32).toString('hex');

    return {
      rawToken,
      tokenHash: this.generateFromRaw(rawToken),
    };
  }

  generateFromRaw(rawToken: string): string {
    return createHash('sha256').update(rawToken).digest('hex');
  }
}
