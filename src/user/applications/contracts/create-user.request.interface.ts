import type { UserRoleEnum } from './user-role.enum';
import type { UserStatusEnum } from './user-status.enum';
import { UserDocuments, ContactDetails, SocialMedias } from './user.interface';

export interface CreateUserRequestInterface {
  role?: UserRoleEnum;
  isPaidMembership?: boolean;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  status?: UserStatusEnum;
  birthday?: string;
  documents?: UserDocuments;
  details?: ContactDetails;
  social?: SocialMedias;
}
