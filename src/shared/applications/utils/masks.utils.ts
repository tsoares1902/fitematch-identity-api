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
  private static readonly CNPJ_FIRST_WEIGHTS = [
    5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2,
  ];
  private static readonly CNPJ_SECOND_WEIGHTS = [
    6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2,
  ];

  public personIdentityDocumentMask(document: string): string {
    const digits = document.replace(/\D/g, '');
    if (digits.length < 7 || digits.length > 9) return document;
    return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1-$2-$3-$4');
  }

  public brazilPersonIdentityDocumentMask(document: string): string {
    return this.personIdentityDocumentMask(document);
  }

  public personSocialDocumentMask(document: string): string {
    const digits = document.replace(/\D/g, '');
    if (digits.length !== 11) return document;
    return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  public brazilPersonSocialDocumentMask(document: string): string {
    return this.personSocialDocumentMask(document);
  }

  public companySocialDocumentMask(document: string): string {
    const normalized = document.toUpperCase().replace(/[^A-Z0-9]/g, '');

    if (!this.isValidCompanySocialDocument(normalized)) {
      return document;
    }

    return normalized.replace(
      /([A-Z0-9]{2})([A-Z0-9]{3})([A-Z0-9]{3})([A-Z0-9]{4})(\d{2})/,
      '$1.$2.$3/$4-$5',
    );
  }

  public brazilCompanySocialDocumentMask(document: string): string {
    return this.companySocialDocumentMask(document);
  }

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

  public brazilPhoneMask(phone: string): string {
    return this.phoneMask(phone);
  }

  public zipCodeMask(zipCode: string): string {
    const digits = zipCode.replace(/\D/g, '');
    if (digits.length !== 8) return zipCode;
    return digits.replace(/(\d{5})(\d{3})/, '$1-$2');
  }

  public brazilZipCodeMask(zipCode: string): string {
    return this.zipCodeMask(zipCode);
  }

  private isValidCompanySocialDocument(document: string): boolean {
    if (!/^[A-Z0-9]{12}\d{2}$/.test(document)) {
      return false;
    }

    const base = document.slice(0, 12);
    const firstDigit = this.calculateCompanySocialDocumentDigit(
      base,
      MasksUtils.CNPJ_FIRST_WEIGHTS,
    );
    const secondDigit = this.calculateCompanySocialDocumentDigit(
      `${base}${firstDigit}`,
      MasksUtils.CNPJ_SECOND_WEIGHTS,
    );

    return document.endsWith(`${firstDigit}${secondDigit}`);
  }

  private calculateCompanySocialDocumentDigit(
    value: string,
    weights: number[],
  ): number {
    const sum = value.split('').reduce((total, character, index) => {
      return (
        total + this.toCompanySocialDocumentValue(character) * weights[index]
      );
    }, 0);

    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }

  private toCompanySocialDocumentValue(character: string): number {
    return character.charCodeAt(0) - 48;
  }
}
