import { ConflictException } from '@nestjs/common';
import { toDomainUser } from '@src/user/adapters/persistence/mappers/user-persistence.mapper';
import type { UserPersistenceDocument } from '@src/user/adapters/persistence/mongoose/user.persistence';
import type { ListUserQueryInterface } from '@src/user/applications/contracts/list-user-query.interface';
import type { UserRecord } from '@src/user/applications/contracts/user-record.interface';
import { UserRoleEnum } from '@src/user/applications/contracts/user-role.enum';
import { UserStatusEnum } from '@src/user/applications/contracts/user-status.enum';
import {
  ProductRoleEnum,
  UserStatusEnum as DomainUserStatusEnum,
} from '@src/user/domains/entities/user.entity';
import type { User } from '@src/user/applications/contracts/user.interface';
import type { SortOrder } from 'mongoose';

export function toLegacyUserRecord(
  document: UserPersistenceDocument,
): UserRecord {
  const user = toDomainUser(document);

  return {
    id: user.id,
    role: toLegacyRole(user),
    isPaidMembership: false,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    status: toLegacyStatus(user.status),
    birthday: user.birthday ?? '',
    documents: user.candidateProfile?.documents
      ? {
          identityDocument:
            user.candidateProfile.documents.identityDocumentNumber,
          socialDocument: user.candidateProfile.documents.socialDocumentNumber,
          otherDocumentt: user.candidateProfile.documents.passportNumber,
        }
      : undefined,
    details: user.candidateProfile?.contacts
      ? {
          phone: user.candidateProfile.contacts.phone,
          isWhatsapp: user.candidateProfile.contacts.isWhatsapp,
          isTelegram: user.candidateProfile.contacts.isTelegram,
          street: user.candidateProfile.contacts.street,
          number: user.candidateProfile.contacts.number,
          complement: user.candidateProfile.contacts.complement,
          neighborhood: user.candidateProfile.contacts.neighborhood,
          city: user.candidateProfile.contacts.city,
          state: user.candidateProfile.contacts.state,
          country: user.candidateProfile.contacts.country,
          zipCode: user.candidateProfile.contacts.zipCode,
        }
      : undefined,
    social: user.candidateProfile?.social
      ? {
          instagram: user.candidateProfile.social.instagram,
          linkedin: user.candidateProfile.social.linkedin,
        }
      : undefined,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export function toPersistenceWriteModel(
  data: Partial<User>,
): Record<string, unknown> {
  const persistenceData: Record<string, unknown> = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    birthday: data.birthday,
  };

  if (data.status !== undefined) {
    persistenceData.status = toPersistenceStatus(data.status);
  }

  if (data.role !== undefined) {
    if (data.role === UserRoleEnum.ADMIN) {
      persistenceData.isInternal = true;
      persistenceData.adminRole = 'admin';
    } else {
      persistenceData.productRole = data.role;
      persistenceData.isInternal = false;
    }
  }

  const candidateProfile: Record<string, unknown> = {};

  if (data.documents) {
    candidateProfile.documents = {
      identityDocumentNumber: data.documents.identityDocument,
      socialDocumentNumber: data.documents.socialDocument,
      passportNumber: data.documents.otherDocumentt,
    };
  }

  if (data.details) {
    candidateProfile.contacts = {
      phone: data.details.phone,
      isWhatsapp: data.details.isWhatsapp,
      isTelegram: data.details.isTelegram,
      street: data.details.street,
      number: data.details.number,
      complement: data.details.complement,
      neighborhood: data.details.neighborhood,
      city: data.details.city,
      state: data.details.state,
      country: data.details.country,
      zipCode: data.details.zipCode,
    };
  }

  if (data.social) {
    candidateProfile.social = {
      instagram: data.social.instagram,
      linkedin: data.social.linkedin,
    };
  }

  if (Object.keys(candidateProfile).length > 0) {
    persistenceData.candidateProfile = candidateProfile;
  }

  return Object.fromEntries(
    Object.entries(persistenceData).filter(([, value]) => value !== undefined),
  );
}

export function buildLegacyListQuery(
  filters: ListUserQueryInterface,
): Record<string, unknown> {
  const query: Record<string, unknown> = {};

  if (filters.id !== undefined) {
    query._id = filters.id;
  }

  const searchableFields = ['firstName', 'lastName', 'email'] as const;

  for (const field of searchableFields) {
    const value = filters[field];

    if (value !== undefined) {
      query[field] = { $regex: value, $options: 'i' };
    }
  }

  if (filters.status !== undefined) {
    query.status = toPersistenceStatus(filters.status);
  }

  if (filters.role !== undefined) {
    if (filters.role === UserRoleEnum.ADMIN) {
      query.isInternal = true;
    } else {
      query.productRole = filters.role;
    }
  }

  return query;
}

export function buildLegacyListSort(
  filters: ListUserQueryInterface,
): Record<string, SortOrder> {
  const sortField = filters.sortBy ?? 'createdAt';
  const sortOrder: SortOrder = filters.sortOrder === 'asc' ? 1 : -1;

  return { [sortField]: sortOrder };
}

export function handleDuplicateKeyError(error: unknown): void {
  if (
    typeof error !== 'object' ||
    error === null ||
    !('code' in error) ||
    error.code !== 11000
  ) {
    return;
  }

  const duplicatedFields =
    'keyPattern' in error &&
    typeof error.keyPattern === 'object' &&
    error.keyPattern !== null
      ? Object.keys(error.keyPattern)
      : [];

  if (duplicatedFields.includes('email')) {
    throw new ConflictException('email already exists');
  }

  throw new ConflictException('duplicate unique field');
}

function toLegacyRole(user: ReturnType<typeof toDomainUser>): UserRoleEnum {
  if (user.isInternal || user.adminRole) {
    return UserRoleEnum.ADMIN;
  }

  return user.productRole === ProductRoleEnum.RECRUITER
    ? UserRoleEnum.RECRUITER
    : UserRoleEnum.CANDIDATE;
}

function toLegacyStatus(
  status: ReturnType<typeof toDomainUser>['status'],
): UserStatusEnum {
  if (status === DomainUserStatusEnum.PENDING_EMAIL_VERIFICATION) {
    return UserStatusEnum.PENDING;
  }

  if (status === DomainUserStatusEnum.ACTIVE) {
    return UserStatusEnum.ENABLED;
  }

  return UserStatusEnum.DISABLED;
}

function toPersistenceStatus(status: UserStatusEnum): string {
  switch (status) {
    case UserStatusEnum.PENDING:
      return 'pending_email_verification';
    case UserStatusEnum.ENABLED:
      return 'active';
    case UserStatusEnum.DISABLED:
    default:
      return 'deactivated';
  }
}
