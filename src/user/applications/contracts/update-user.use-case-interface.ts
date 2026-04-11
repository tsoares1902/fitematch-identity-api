import type {
  CandidateProfileInterface,
  RecruiterProfileInterface,
} from './user.interface';
import type { ResultUpdateUserUseCaseInterface } from './result-update-user.use-case.interface';

export const UPDATE_USER_USE_CASE_INTERFACE = 'UPDATE_USER_USE_CASE_INTERFACE';

export interface UpdateUserDataUseCaseInterface {
  firstName?: string;
  lastName?: string;
  email?: string;
  birthday?: string;
  status?: string;
  productRole?: string;
  adminRole?: string;
  permissions?: string[];
  isInternal?: boolean;
  candidateProfile?: CandidateProfileInterface;
  recruiterProfile?: RecruiterProfileInterface;
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
