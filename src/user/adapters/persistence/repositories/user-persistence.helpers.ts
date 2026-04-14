import type { UserInterface } from '@src/user/applications/contracts/user.interface';

export function toPersistenceWriteModel(
  data: Partial<UserInterface> & {
    password?: string;
    tokenVersion?: number;
  },
): Record<string, unknown> {
  const persistenceData: Record<string, unknown> = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    birthday: data.birthday,
    status: data.status,
    isInternal: data.isInternal,
    productRole: data.productRole,
    productPermissions: data.productPermissions,
    adminRole: data.adminRole,
    adminPermissions: data.adminPermissions ?? data.permissions,
    permissions: data.adminPermissions ?? data.permissions,
    candidateProfile: data.candidateProfile,
    recruiterProfile: data.recruiterProfile,
    accountVerifiedAt: data.accountVerifiedAt,
    tokenVersion: data.tokenVersion,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };

  Object.keys(persistenceData).forEach(
    (key) => persistenceData[key] === undefined && delete persistenceData[key],
  );
  return persistenceData;
}
