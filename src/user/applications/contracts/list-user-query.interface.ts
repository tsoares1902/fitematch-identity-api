import type {
  CandidateProfileInterface,
  RecruiterProfileInterface,
} from './user.interface';

export type ListUserSortField =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'createdAt'
  | 'updatedAt';

export type ListUserSortOrder = 'asc' | 'desc';

export interface ListUserQueryInterface {
  id?: string;
  productRole?: import('@src/user/domains/entities/user.entity').ProductRoleEnum;
  isInternal?: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  status?: import('@src/user/domains/entities/user.entity').UserStatusEnum;
  candidateProfile?: Partial<CandidateProfileInterface>;
  recruiterProfile?: Partial<RecruiterProfileInterface>;
  page?: number;
  limit?: number;
  sortBy?: ListUserSortField;
  sortOrder?: ListUserSortOrder;
}
