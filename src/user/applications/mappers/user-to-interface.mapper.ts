import type { User } from '@src/user/domains/entities/user.entity';
import type { UserInterface } from '@src/user/applications/contracts/user.interface';

export function userToInterface(user: User): UserInterface {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    birthday: user.birthday,
    status: user.status,
    productRole: user.productRole,
    adminRole: user.adminRole,
    permissions: user.permissions,
    isInternal: user.isInternal,
    candidateProfile: user.candidateProfile,
    recruiterProfile: user.recruiterProfile,
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
