export const ONE_TIME_TOKEN_SERVICE = 'ONE_TIME_TOKEN_SERVICE';

export interface OneTimeToken {
  rawToken: string;
  tokenHash: string;
}

export interface OneTimeTokenService {
  generate(): OneTimeToken;
  generateFromRaw(rawToken: string): string;
}
