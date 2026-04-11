import type {
  CandidateProfileInterface,
  RecruiterProfileInterface,
  UserInterface,
} from '@src/user/applications/contracts/user.interface';
import { UserPublicDto } from '../dto/user-public.dto';
import type {
  CandidateProfileDto,
  RecruiterProfileDto,
} from '../dto/user-public.dto';

export function userInterfaceToPublicDto(user: UserInterface): UserPublicDto {
  return {
    id: user.id ?? '',
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    birthday: user.birthday,
    status: user.status,
    productRole: user.productRole,
    adminRole: user.adminRole,
    permissions: user.permissions,
    isInternal: user.isInternal,
    candidateProfile: toCandidateProfileDto(user.candidateProfile),
    recruiterProfile: toRecruiterProfileDto(user.recruiterProfile),
    emailVerifiedAt: user.emailVerifiedAt,
    createdBy: user.createdBy,
    lastLoginAt: user.lastLoginAt,
    suspendedAt: user.suspendedAt,
    suspendedReason: user.suspendedReason,
    deactivatedAt: user.deactivatedAt,
    deactivatedReason: user.deactivatedReason,
    bannedAt: user.bannedAt,
    bannedReason: user.bannedReason,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function toCandidateProfileDto(
  profile?: CandidateProfileInterface,
): CandidateProfileDto | undefined {
  return profile;
}

function toRecruiterProfileDto(
  profile?: RecruiterProfileInterface,
): RecruiterProfileDto | undefined {
  return profile;
}
