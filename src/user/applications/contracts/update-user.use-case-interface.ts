import type {
  AdminRoleEnum,
  CandidateProfile,
  PermissionEnum,
  ProductRoleEnum,
  RecruiterProfile,
  UserStatusEnum,
} from '@src/user/domains/entities/user.entity';
import type { ResultUpdateUserUseCaseInterface } from './result-update-user.use-case.interface';

export const UPDATE_USER_USE_CASE_INTERFACE = 'UPDATE_USER_USE_CASE_INTERFACE';

export interface UpdateUserDataUseCaseInterface {
  firstName?: string;
  lastName?: string;
  email?: string;
  birthday?: string;
  status?: UserStatusEnum;
  productRole?: ProductRoleEnum;
  adminRole?: AdminRoleEnum;
  permissions?: PermissionEnum[];
  isInternal?: boolean;
  candidateProfile?: CandidateProfile;
  recruiterProfile?: RecruiterProfile;
  emailVerifiedAt?: string;
  createdBy?: string;
  lastLoginAt?: string;
  suspendedAt?: string;
  suspendedReason?: string;
  deactivatedAt?: string;
  deactivatedReason?: string;
  bannedAt?: string;
  bannedReason?: string;
}

export interface UpdateUserUseCaseInterface {
  execute(
    id: string,
    data: UpdateUserDataUseCaseInterface,
  ): Promise<ResultUpdateUserUseCaseInterface>;
}
