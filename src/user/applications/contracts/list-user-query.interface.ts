import type { UserRoleEnum } from '@src/user/applications/contracts/user-role.enum';
import type { UserStatusEnum } from '@src/user/applications/contracts/user-status.enum';
import { UserDocuments, ContactDetails, SocialMedias } from './user.interface';

export type ListUserSortField =
  | 'isPaidMembership'
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'createdAt'
  | 'updatedAt';

export type ListUserSortOrder = 'asc' | 'desc';

export interface ListUsersQueryInterface {
  id?: string;
  role?: UserRoleEnum;
  isPaidMembership?: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  status?: UserStatusEnum;
  birthday?: string;
  documents?: UserDocuments;
  details?: ContactDetails;
  social?: SocialMedias;
  page?: number;
  limit?: number;
  route?: string;
  sortBy?: ListUserSortField;
  sortOrder?: ListUserSortOrder;
}
