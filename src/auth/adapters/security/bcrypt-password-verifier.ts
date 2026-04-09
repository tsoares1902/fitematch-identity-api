import { Injectable } from '@nestjs/common';
import EncryptUtils from '@src/shared/applications/utils/encrypt.utils';
import type { PasswordVerifier } from '@src/auth/domains/services/password-verifier';

@Injectable()
export class BcryptPasswordVerifier implements PasswordVerifier {
  constructor(private readonly encryptUtils: EncryptUtils) {}

  async verify(plainText: string, passwordHash: string): Promise<boolean> {
    return this.encryptUtils.comparePassword(plainText, passwordHash);
  }
}
