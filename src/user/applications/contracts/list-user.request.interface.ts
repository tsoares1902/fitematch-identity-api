import type { UserRoleEnum } from './user-role.enum';
import type { UserStatusEnum } from './user-status.enum';
import { UserDocuments, ContactDetails, SocialMedias } from './user.interface';

export type ListUserSortField =
  | 'username'
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'createdAt'
  | 'updatedAt';

export type ListUserSortOrder = 'asc' | 'desc';

export interface ListUserRequestInterface {
  id?: string;
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
  sortBy?: ListUserSortField;
  sortOrder?: ListUserSortOrder;
}
