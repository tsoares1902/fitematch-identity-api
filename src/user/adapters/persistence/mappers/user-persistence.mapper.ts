import type {
  AvailabilityEntity,
  User,
  CandidateProfileEntity,
  EthnicityEnum,
  EthnicityEntity,
  SexualOrientationEnum,
  DiversityEntity,
  GenderIdentityEnum,
  ClothingSizeEnum,
  UniformSizesEntity,
  EmploymentTypeEnum,
  WorkShiftEnum,
  ProfessionalProfileEntity,
  EducationLevelEnum,
  EducationStatusEnum,
  CourseTypeEnum,
  EducationEntity,
  AvailabilityDayEnum,
  LocationPreferencesEntity,
  WorkModelEnum,
  ProfessionalMediaEntity,
  PhoneEntity,
  AddressEntity,
  SocialEntity,
  RecruiterProfileEntity,
} from '@src/user/domains/entities/user.entity';
import type { UserPersistenceDocument } from '@src/user/adapters/persistence/mongoose/user.persistence';

type PersistenceCandidateProfile = NonNullable<
  UserPersistenceDocument['candidateProfile']
>;
type PersistenceRecruiterProfile = NonNullable<
  UserPersistenceDocument['recruiterProfile']
>;
type PersistenceContacts = NonNullable<PersistenceCandidateProfile['contacts']>;
type PersistenceSocial = Partial<SocialEntity>;
type PersistenceDemographics = NonNullable<
  PersistenceCandidateProfile['demographics']
>;
type PersistenceUniformSizes = NonNullable<
  PersistenceCandidateProfile['uniformSizes']
>;
type PersistenceProfessionalProfile = NonNullable<
  PersistenceCandidateProfile['professionalProfile']
>;
type PersistenceEducations = NonNullable<
  PersistenceCandidateProfile['educations']
>;
type PersistenceAvailability = NonNullable<
  PersistenceCandidateProfile['availability']
>;
type PersistenceLocationPreferences = NonNullable<
  PersistenceCandidateProfile['locationPreferences']
>;
type PersistenceProfessionalMedia = NonNullable<
  PersistenceCandidateProfile['professionalMedia']
>;

export function toDomainUser(document: UserPersistenceDocument): User {
  return {
    id: document._id.toString(),
    firstName: document.firstName,
    lastName: document.lastName,
    email: document.email,
    birthday: document.birthday,
    status: document.status,
    productRole: document.productRole,
    productPermissions: document.productPermissions,
    adminRole: document.adminRole,
    adminPermissions: document.adminPermissions ?? document.permissions,
    permissions: document.adminPermissions ?? document.permissions,
    isInternal: document.isInternal,
    candidateProfile: toCandidateProfile(document.candidateProfile),
    recruiterProfile: toRecruiterProfile(document.recruiterProfile),
    accountVerifiedAt: document.emailVerifiedAt,
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
  };
}

function toCandidateProfile(
  profile?: PersistenceCandidateProfile,
): CandidateProfileEntity | undefined {
  if (!profile) {
    return undefined;
  }

  return {
    documents: profile.documents,
    phone: toPhone(profile.contacts),
    address: toAddress(profile.contacts),
    social: toSocial(profile.social),
    ethnicity: toEthnicity(profile.demographics),
    diversity: toDiversity(profile.demographics),
    physicalProfile: profile.physicalProfile,
    uniformSizes: toUniformSizes(profile.uniformSizes),
    professionalProfile: toProfessionalProfile(profile.professionalProfile),
    educations: toEducations(profile.educations),
    experiences: undefined,
    availability: toAvailability(profile.availability),
    locationPreferences: toLocationPreferences(profile.locationPreferences),
    professionalMedia: toProfessionalMedia(profile.professionalMedia),
  };
}

function toRecruiterProfile(
  profile?: PersistenceRecruiterProfile,
): RecruiterProfileEntity | undefined {
  if (!profile) {
    return undefined;
  }

  return {
    position: profile.position,
    documents: profile.companyDocument
      ? {
          socialDocumentNumber: profile.companyDocument,
        }
      : undefined,
    phone: profile.phone
      ? {
          phone: profile.phone,
        }
      : undefined,
    address: undefined,
  };
}

function toPhone(contacts?: PersistenceContacts): PhoneEntity | undefined {
  if (!contacts) {
    return undefined;
  }

  return {
    phone: contacts.phone,
    isWhatsapp: contacts.isWhatsapp,
    isTelegram: contacts.isTelegram,
  };
}

function toAddress(contacts?: PersistenceContacts): AddressEntity | undefined {
  if (!contacts) {
    return undefined;
  }

  return {
    street: contacts.street,
    number: contacts.number,
    complement: contacts.complement,
    neighborhood: contacts.neighborhood,
    city: contacts.city,
    state: contacts.state,
    country: contacts.country,
    zipCode: contacts.zipCode,
  };
}

function toSocial(social?: PersistenceSocial): SocialEntity | undefined {
  if (!social) {
    return undefined;
  }

  return {
    facebook: social.facebook,
    instagram: social.instagram,
    x: social.x,
    tiktok: social.tiktok,
    linkedin: social.linkedin,
    youtube: social.youtube,
    website: social.website,
  };
}

function toEthnicity(
  demographics?: PersistenceDemographics,
): EthnicityEntity | undefined {
  if (!demographics) {
    return undefined;
  }

  return {
    ethnicity: demographics.ethnicity as EthnicityEnum,
  };
}

function toDiversity(
  demographics?: PersistenceDemographics,
): DiversityEntity | undefined {
  if (!demographics) {
    return undefined;
  }

  return {
    sexualOrientation: demographics.sexualOrientation as SexualOrientationEnum,
    genderIdentity: demographics.genderIdentity as GenderIdentityEnum,
  };
}

function toUniformSizes(
  uniformSizes?: PersistenceUniformSizes,
): UniformSizesEntity | undefined {
  if (!uniformSizes) {
    return undefined;
  }

  return {
    ...uniformSizes,
    tShirt: uniformSizes.tShirt as ClothingSizeEnum,
    shorts: uniformSizes.shorts as ClothingSizeEnum,
    pants: uniformSizes.pants as ClothingSizeEnum,
  };
}

function toProfessionalProfile(
  professionalProfile?: PersistenceProfessionalProfile,
): ProfessionalProfileEntity | undefined {
  if (!professionalProfile) {
    return undefined;
  }

  return {
    ...professionalProfile,
    employmentTypes: professionalProfile.employmentTypes?.map(
      (value) => value as EmploymentTypeEnum,
    ),
    workShifts: professionalProfile.workShifts?.map(
      (value) => value as WorkShiftEnum,
    ),
  };
}

function toEducations(
  educations?: PersistenceEducations,
): EducationEntity[] | undefined {
  return educations?.map((education) => ({
    ...education,
    level: education.level as EducationLevelEnum,
    status: education.status as EducationStatusEnum,
    courseType: education.courseType as CourseTypeEnum,
  }));
}

function toAvailability(
  availability?: PersistenceAvailability,
): AvailabilityEntity | undefined {
  if (!availability) {
    return undefined;
  }

  return {
    ...availability,
    availableDays: availability.availableDays?.map(
      (value) => value as AvailabilityDayEnum,
    ),
    availableShifts: availability.availableShifts?.map(
      (value) => value as WorkShiftEnum,
    ),
  };
}

function toLocationPreferences(
  locationPreferences?: PersistenceLocationPreferences,
): LocationPreferencesEntity | undefined {
  if (!locationPreferences) {
    return undefined;
  }

  return {
    ...locationPreferences,
    workModels: locationPreferences.workModels?.map(
      (value) => value as WorkModelEnum,
    ),
  };
}

function toProfessionalMedia(
  professionalMedia?: PersistenceProfessionalMedia,
): ProfessionalMediaEntity | undefined {
  if (!professionalMedia) {
    return undefined;
  }

  return {
    profilePictureUrl: professionalMedia.profilePictureUrl,
    resumeUrl: professionalMedia.resumeUrl,
  };
}
