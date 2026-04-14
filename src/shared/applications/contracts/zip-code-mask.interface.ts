export const ZIP_CODE_MASK_INTERFACE = 'ZipCodeMaskInterface';

export interface ZipCodeMaskInterface {
  zipCodeMask(zipCode: string): string;
}
