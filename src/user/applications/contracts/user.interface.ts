import type { UserRoleEnum } from './user-role.enum';
import type { UserStatusEnum } from './user-status.enum';

export interface UserDocuments {
  identityDocument?: string;
  socialDocument?: string;
  otherDocumentt?: string;
}

export interface ContactDetails {
  phone?: string;
  isWhatsapp?: boolean;
  isTelegram?: boolean;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
}

export interface SocialMedias {
  facebook?: string;
  x?: string;
  instagram?: string;
  linkedin?: string;
  whatsapp?: string;
  telegram?: string;
}

export interface User {
  isPaidMembership: boolean;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthday: string;
  role: UserRoleEnum;
  status: UserStatusEnum;
  documents?: UserDocuments;
  details?: ContactDetails;
  social?: SocialMedias;
}
