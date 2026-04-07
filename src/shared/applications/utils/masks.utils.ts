import { BrazilPersonIdentityDocumentMaskInterface } from '../contracts/brazil-person-identity-document-mask.interface';
import { BrazilPersonSocialDocumentMaskInterface } from '../contracts/brazil-person-social-document-mask.interface';
import { BrazilPhoneMaskInterface } from '../contracts/brazil-phone-mask.interface';
import { BrazilZipCodeMaskInterface } from '../contracts/brazil-zip-code-mask.interface';

export const MASKS_UTILS = 'MasksUtils';

export default class MasksUtils
  implements
    BrazilPersonIdentityDocumentMaskInterface,
    BrazilPersonSocialDocumentMaskInterface,
    BrazilPhoneMaskInterface,
    BrazilZipCodeMaskInterface
{
  public brazilPersonIdentityDocumentMask(document: string): string {
    const digits = document.replace(/\D/g, '');
    if (digits.length < 7 || digits.length > 9) return document;
    return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1-$2-$3-$4');
  }

  public brazilPersonSocialDocumentMask(document: string): string {
    const digits = document.replace(/\D/g, '');
    if (digits.length !== 11) return document;
    return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  public brazilCompanySocialDocumentMask(document: string): string {
    const digits = document.replace(/\D/g, '');
    if (digits.length < 12 || digits.length > 14) return document;
    return digits.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5',
    );
  }

  public brazilPhoneMask(phone: string): string {
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 10) {
      return digits.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    if (digits.length === 11) {
      return digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return phone;
  }

  public brazilZipCodeMask(zipCode: string): string {
    const digits = zipCode.replace(/\D/g, '');
    if (digits.length !== 8) return zipCode;
    return digits.replace(/(\d{5})(\d{3})/, '$1-$2');
  }
}
