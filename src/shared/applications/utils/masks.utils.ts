export const MASKS_UTILS = 'MasksUtils';

export default class MasksUtils {
  static applyBrazilianPersonIdentityDocumentMask(document: string): string {
    const digits = document.replace(/\D/g, '');
    if (digits.length < 7 || digits.length > 9) return document;
    return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1-$2-$3-$4');
  }

  static applyBrazilianPersonSocialDocumentMask(document: string): string {
    const digits = document.replace(/\D/g, '');
    if (digits.length !== 11) return document;
    return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  static applyBrazilianCompanySocialDocumentMask(document: string): string {
    const digits = document.replace(/\D/g, '');
    if (digits.length < 12 || digits.length > 14) return document;
    return digits.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5',
    );
  }

  static applyBrazilianPhoneMask(phone: string): string {
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 10) {
      return digits.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    if (digits.length === 11) {
      return digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return phone;
  }

  static applyBrazilianZipCodeMask(zipCode: string): string {
    const digits = zipCode.replace(/\D/g, '');
    if (digits.length !== 8) return zipCode;
    return digits.replace(/(\d{5})(\d{3})/, '$1-$2');
  }
}
