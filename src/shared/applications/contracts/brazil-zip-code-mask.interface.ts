export const BRAZIL_ZIP_CODE_MASK_INTERFACE = 'BrazilZipCodeMaskInterface';

export interface BrazilZipCodeMaskInterface {
  brazilZipCodeMask(zipCode: string): string;
}
