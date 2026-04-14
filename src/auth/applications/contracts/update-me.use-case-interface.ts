import type { CandidateProfileInterface } from '@src/user/applications/contracts/user.interface';
import type { RecruiterProfileInterface } from '@src/user/applications/contracts/user.interface';
import type { ResultUpdateUserUseCaseInterface } from '@src/user/applications/contracts/result-update-user.use-case.interface';

export const UPDATE_ME_USE_CASE = 'UPDATE_ME_USE_CASE';

export interface UpdateMeData {
  firstName?: string;
  lastName?: string;
  email?: string;
  birthday?: string;
  candidateProfile?: CandidateProfileInterface;
  recruiterProfile?: RecruiterProfileInterface;
}

export interface UpdateMeUseCaseInterface {
  execute(
    userId: string,
    data: UpdateMeData,
  ): Promise<ResultUpdateUserUseCaseInterface>;
}
