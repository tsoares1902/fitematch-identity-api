import type { User } from '@src/user/domains/entities/user.entity';
import type { UserPersistenceDocument } from '@src/user/adapters/persistence/mongoose/user.persistence';

export function toDomainUser(document: UserPersistenceDocument): User {
  return {
    id: document._id.toString(),
    firstName: document.firstName,
    lastName: document.lastName,
    email: document.email,
    birthday: document.birthday,
    status: document.status,
    productRole: document.productRole,
    adminRole: document.adminRole,
    permissions: document.permissions,
    isInternal: document.isInternal,
    candidateProfile: document.candidateProfile,
    recruiterProfile: document.recruiterProfile,
    emailVerifiedAt: document.emailVerifiedAt,
    createdBy: document.createdBy,
    lastLoginAt: document.lastLoginAt,
    suspendedAt: document.suspendedAt,
    suspendedReason: document.suspendedReason,
    deactivatedAt: document.deactivatedAt,
    deactivatedReason: document.deactivatedReason,
    bannedAt: document.bannedAt,
    bannedReason: document.bannedReason,
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
  };
}
