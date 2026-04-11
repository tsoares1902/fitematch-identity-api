import type {
  User,
  EthnicityEnum,
  SexualOrientationEnum,
  GenderIdentityEnum,
  ClothingSizeEnum,
  EmploymentTypeEnum,
  WorkShiftEnum,
  EducationLevelEnum,
  EducationStatusEnum,
  CourseTypeEnum,
  AvailabilityDayEnum,
  WorkModelEnum,
} from '@src/user/domains/entities/user.entity';
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
    candidateProfile: document.candidateProfile
      ? {
          ...document.candidateProfile,
          demographics: document.candidateProfile.demographics
            ? {
                ...document.candidateProfile.demographics,
                ethnicity: document.candidateProfile.demographics
                  .ethnicity as EthnicityEnum,
                sexualOrientation: document.candidateProfile.demographics
                  .sexualOrientation as SexualOrientationEnum,
                genderIdentity: document.candidateProfile.demographics
                  .genderIdentity as GenderIdentityEnum,
              }
            : undefined,
          uniformSizes: document.candidateProfile.uniformSizes
            ? {
                ...document.candidateProfile.uniformSizes,
                tShirt: document.candidateProfile.uniformSizes
                  .tShirt as ClothingSizeEnum,
                shorts: document.candidateProfile.uniformSizes
                  .shorts as ClothingSizeEnum,
                pants: document.candidateProfile.uniformSizes
                  .pants as ClothingSizeEnum,
              }
            : undefined,
          professionalProfile: document.candidateProfile.professionalProfile
            ? {
                ...document.candidateProfile.professionalProfile,
                employmentTypes:
                  document.candidateProfile.professionalProfile.employmentTypes?.map(
                    (e) => e as EmploymentTypeEnum,
                  ),
                workShifts:
                  document.candidateProfile.professionalProfile.workShifts?.map(
                    (e) => e as WorkShiftEnum,
                  ),
              }
            : undefined,
          educations: document.candidateProfile.educations?.map((edu) => ({
            ...edu,
            level: edu.level as EducationLevelEnum,
            status: edu.status as EducationStatusEnum,
            courseType: edu.courseType as CourseTypeEnum,
          })),
          availability: document.candidateProfile.availability
            ? {
                ...document.candidateProfile.availability,
                availableDays:
                  document.candidateProfile.availability.availableDays?.map(
                    (e) => e as AvailabilityDayEnum,
                  ),
                availableShifts:
                  document.candidateProfile.availability.availableShifts?.map(
                    (e) => e as WorkShiftEnum,
                  ),
              }
            : undefined,
          locationPreferences: document.candidateProfile.locationPreferences
            ? {
                ...document.candidateProfile.locationPreferences,
                workModels:
                  document.candidateProfile.locationPreferences.workModels?.map(
                    (e) => e as WorkModelEnum,
                  ),
              }
            : undefined,
        }
      : undefined,
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
