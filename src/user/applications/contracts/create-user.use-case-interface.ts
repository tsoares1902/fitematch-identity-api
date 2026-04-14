import type {
  CandidateProfileInterface,
  RecruiterProfileInterface,
} from './user.interface';
import type { ResultCreateUserUseCaseInterface } from '@src/user/applications/contracts//result-create-user.use-case.interface';

export const CREATE_USER_USE_CASE_INTERFACE = 'CREATE_USER_USE_CASE_INTERFACE';

export interface CreateUserDataUseCaseInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthday: string;
  status?: string;
  productRole?: string;
  productPermissions?: string[];
  adminRole?: string;
  adminPermissions?: string[];
  permissions?: string[];
  isInternal?: boolean;
  candidateProfile?: CandidateProfileInterface;
  recruiterProfile?: RecruiterProfileInterface;
}

export interface CreateUserUseCaseInterface {
  execute(
    data: CreateUserDataUseCaseInterface,
  ): Promise<ResultCreateUserUseCaseInterface>;
}
