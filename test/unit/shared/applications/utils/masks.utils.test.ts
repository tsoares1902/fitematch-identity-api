import MasksUtils from '@src/shared/applications/utils/masks.utils';

describe('MasksUtils', () => {
  let masksUtils: MasksUtils;

  beforeEach(() => {
    masksUtils = new MasksUtils();
  });

  describe('document masks', () => {
    it('should format a social document', () => {
      expect(masksUtils.personSocialDocumentMask('12345678901')).toBe(
        '123.456.789-01',
      );
    });

    it('should return the original social document when invalid', () => {
      expect(masksUtils.personSocialDocumentMask('123')).toBe('123');
    });

    it('should format an identity document with 9 digits', () => {
      expect(masksUtils.personIdentityDocumentMask('123456781')).toBe(
        '12-345-678-1',
      );
    });

    it('should return the original identity document when invalid', () => {
      expect(masksUtils.personIdentityDocumentMask('123')).toBe('123');
    });

    it('should format a company social document', () => {
      expect(masksUtils.companySocialDocumentMask('12345678000195')).toBe(
        '12.345.678/0001-95',
      );
    });

    it('should format a valid alphanumeric company social document', () => {
      expect(masksUtils.companySocialDocumentMask('AB12CD34000184')).toBe(
        'AB.12C.D34/0001-84',
      );
    });

    it('should return the original company social document when invalid', () => {
      expect(masksUtils.companySocialDocumentMask('123')).toBe('123');
    });

    it('should format an alphanumeric company social document when shape is valid', () => {
      expect(masksUtils.companySocialDocumentMask('AB12CD34000100')).toBe(
        'AB.12C.D34/0001-00',
      );
    });
  });

  describe('contact masks', () => {
    it('should format a phone number with 10 digits', () => {
      expect(masksUtils.phoneMask('1132654321')).toBe('(11) 3265-4321');
    });

    it('should format a phone number with 11 digits', () => {
      expect(masksUtils.phoneMask('11987654321')).toBe('(11) 98765-4321');
    });

    it('should return the original phone number when invalid', () => {
      expect(masksUtils.phoneMask('123')).toBe('123');
    });

    it('should format a valid zip code', () => {
      expect(masksUtils.zipCodeMask('12345678')).toBe('12345-678');
    });

    it('should return the original zip code when invalid', () => {
      expect(masksUtils.zipCodeMask('123')).toBe('123');
    });
  });
});
