import MasksUtils from '@src/shared/applications/utils/masks.utils';

describe('MasksUtils', () => {
  let masksUtils: MasksUtils;

  beforeEach(() => {
    masksUtils = new MasksUtils();
  });

  describe('document masks', () => {
    it('should format a social document', () => {
      expect(masksUtils.brazilPersonSocialDocumentMask('12345678901')).toBe(
        '123.456.789-01',
      );
    });

    it('should return the original social document when invalid', () => {
      expect(masksUtils.brazilPersonSocialDocumentMask('123')).toBe('123');
    });

    it('should format an identity document with 9 digits', () => {
      expect(masksUtils.brazilPersonIdentityDocumentMask('123456781')).toBe(
        '12-345-678-1',
      );
    });

    it('should return the original identity document when invalid', () => {
      expect(masksUtils.brazilPersonIdentityDocumentMask('123')).toBe('123');
    });

    it('should format a company social document', () => {
      expect(masksUtils.brazilCompanySocialDocumentMask('12345678000199')).toBe(
        '12.345.678/0001-99',
      );
    });

    it('should return the original company social document when invalid', () => {
      expect(masksUtils.brazilCompanySocialDocumentMask('123')).toBe('123');
    });
  });

  describe('contact masks', () => {
    it('should format a phone number with 10 digits', () => {
      expect(masksUtils.brazilPhoneMask('1132654321')).toBe('(11) 3265-4321');
    });

    it('should format a phone number with 11 digits', () => {
      expect(masksUtils.brazilPhoneMask('11987654321')).toBe('(11) 98765-4321');
    });

    it('should return the original phone number when invalid', () => {
      expect(masksUtils.brazilPhoneMask('123')).toBe('123');
    });

    it('should format a valid zip code', () => {
      expect(masksUtils.brazilZipCodeMask('12345678')).toBe('12345-678');
    });

    it('should return the original zip code when invalid', () => {
      expect(masksUtils.brazilZipCodeMask('123')).toBe('123');
    });
  });
});
