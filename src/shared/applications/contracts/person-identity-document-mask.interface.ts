export const PERSON_IDENTITY_DOCUMENT_MASK_INTERFACE =
  'PersonIdentityDocumentMaskInterface';

export interface PersonIdentityDocumentMaskInterface {
  personIdentityDocumentMask(document: string): string;
}
