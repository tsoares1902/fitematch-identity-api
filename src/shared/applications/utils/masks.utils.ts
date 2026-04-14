import { PersonIdentityDocumentMaskInterface } from '@src/shared/applications/contracts/person-identity-document-mask.interface';
import { PersonSocialDocumentMaskInterface } from '@src/shared/applications/contracts/person-social-document-mask.interface';
import { CompanySocialDocumentMaskInterface } from '@src/shared/applications/contracts/company-social-document-mask.interface';
import { PhoneMaskInterface } from '@src/shared/applications/contracts/phone-mask.interface';
import { ZipCodeMaskInterface } from '@src/shared/applications/contracts/zip-code-mask.interface';

export const MASKS_UTILS = 'MasksUtils';

export default class MasksUtils
  implements
    PersonIdentityDocumentMaskInterface,
    PersonSocialDocumentMaskInterface,
    CompanySocialDocumentMaskInterface,
    PhoneMaskInterface,
    ZipCodeMaskInterface
{
  /**
   * Apply a mask to a brazilian identity document (RG) with 9 digits.
   *
   * @param {string} document - brazilian identity document with 9 digits.
   * @returns {string} formatted string in the format XX-XXX-XXX-X.
   */
  public personIdentityDocumentMask(document: string): string {
    const digits = document.replace(/\D/g, '');
    if (digits.length !== 9) return document;
    return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1-$2-$3-$4');
  }

  /**
   * Apply a mask to a brazilian social document (CPF) with 11 digits.
   *
   * @param {string} document - brazilian social document with 11 digits.
   * @returns {string} formatted string in the format XXX.XXX.XXX-XX.
   */
  public personSocialDocumentMask(document: string): string {
    const digits = document.replace(/\D/g, '');
    if (digits.length !== 11) return document;
    return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  /**
   * Apply a mask to a brazilian company social document (CNPJ) with 14 digits.
   *
   * @param {string} document - brazilian company social document with 14 digits.
   * @returns {string} formatted string in the format XX.XXX.XXX/XXXX-XX.
   */
  public companySocialDocumentMask(document: string): string {
    const normalized = document.toUpperCase().replace(/[^A-Z0-9]/g, '');

    if (!/^[A-Z0-9]{12}\d{2}$/.test(normalized)) {
      return document;
    }

    return normalized.replace(
      /([A-Z0-9]{2})([A-Z0-9]{3})([A-Z0-9]{3})([A-Z0-9]{4})(\d{2})/,
      '$1.$2.$3/$4-$5',
    );
  }

  /**
   * Apply a mask to a brazilian phone number.
   *
   * @param {string} phone - brazilian phone number with 10 or 11 digits.
   * @returns {string} formatted string in the format (XX) XXXX-XXXX or (XX) XXXXX-XXXX.
   */
  public phoneMask(phone: string): string {
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 10) {
      return digits.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    if (digits.length === 11) {
      return digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return phone;
  }

  /**
   * Apply a mask to a brazilian zip code (CEP) with 8 digits.
   *
   * @param {string} zipCode - brazilian zip code with 8 digits.
   * @returns {string} formatted string in the format XXXXX-XXX.
   */
  public zipCodeMask(zipCode: string): string {
    const digits = zipCode.replace(/\D/g, '');
    if (digits.length !== 8) return zipCode;
    return digits.replace(/(\d{5})(\d{3})/, '$1-$2');
  }
}
