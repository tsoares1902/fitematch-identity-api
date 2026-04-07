import EncryptUtils from '@src/shared/applications/utils/encrypt.utils';

describe('EncryptUtils', () => {
  let encryptUtils: EncryptUtils;

  beforeEach(() => {
    encryptUtils = new EncryptUtils();
  });

  it('should encrypt and compare passwords', async () => {
    const password = 'secret';
    const hash = await encryptUtils.encryptPassword(password);

    expect(hash).not.toBe(password);
    await expect(encryptUtils.comparePassword(password, hash)).resolves.toBe(
      true,
    );
  });
});
