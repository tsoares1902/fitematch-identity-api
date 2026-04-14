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
    productPermissions: user.productPermissions,
    adminRole: user.adminRole,
    adminPermissions: user.adminPermissions ?? user.permissions,
    permissions: user.adminPermissions ?? user.permissions,
    isInternal: user.isInternal,
    candidateProfile: user.candidateProfile,
    recruiterProfile: user.recruiterProfile,
    accountVerifiedAt: user.accountVerifiedAt,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
