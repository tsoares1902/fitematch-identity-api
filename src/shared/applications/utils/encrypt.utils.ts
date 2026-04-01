import * as bcrypt from 'bcrypt';

export default class EncryptUtils {
  public async encryptPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    return hash;
  }
}
