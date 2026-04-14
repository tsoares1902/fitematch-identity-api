import type {
  CandidateProfileInterface,
  RecruiterProfileInterface,
  UserInterface,
} from '@src/user/applications/contracts/user.interface';
import MasksUtils from '@src/shared/applications/utils/masks.utils';
import type {
  UserPublicDto,
  CandidateProfileDto,
  RecruiterProfileDto,
} from '@src/user/adapters/dto/user-public.dto';

const masksUtils = new MasksUtils();

export function userInterfaceToPublicDto(user: UserInterface): UserPublicDto {
  return {
    id: user.id ?? '',
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
    candidateProfile: toCandidateProfileDto(user.candidateProfile),
    recruiterProfile: toRecruiterProfileDto(user.recruiterProfile),
    emailVerifiedAt: user.accountVerifiedAt,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function toCandidateProfileDto(
  profile?: CandidateProfileInterface,
): CandidateProfileDto | undefined {
  if (!profile) {
    return undefined;
  }

  const candidateProfile: CandidateProfileDto = {
    documents: profile.documents
      ? {
          identityDocumentNumber: profile.documents.identityDocumentNumber
            ? masksUtils.personIdentityDocumentMask(
                profile.documents.identityDocumentNumber,
              )
            : undefined,
          identityIssuer: profile.documents.identityIssuer,
          identityState: profile.documents.identityState,
          socialDocumentNumber: profile.documents.socialDocumentNumber
            ? masksUtils.personSocialDocumentMask(
                profile.documents.socialDocumentNumber,
              )
            : undefined,
          passportNumber: profile.documents.passportNumber,
          passportCountry: profile.documents.passportCountry,
          passportExpirationDate: profile.documents.passportExpirationDate,
          crefNumber: profile.documents.crefNumber,
          crefState: profile.documents.crefState,
        }
      : undefined,
    contacts:
      profile.phone || profile.address
        ? {
            phone: profile.phone?.phone
              ? masksUtils.phoneMask(profile.phone.phone)
              : undefined,
            isWhatsapp: profile.phone?.isWhatsapp,
            isTelegram: profile.phone?.isTelegram,
            street: profile.address?.street,
            number: profile.address?.number,
            complement: profile.address?.complement,
            neighborhood: profile.address?.neighborhood,
            city: profile.address?.city,
            state: profile.address?.state,
            country: profile.address?.country,
            zipCode: profile.address?.zipCode
              ? masksUtils.zipCodeMask(profile.address.zipCode)
              : undefined,
          }
        : undefined,
    social: profile.social
      ? {
          instagram: profile.social.instagram,
          linkedin: profile.social.linkedin,
          youtube: profile.social.youtube,
          website: profile.social.website,
        }
      : undefined,
    demographics:
      profile.ethnicity || profile.diversity
        ? {
            ethnicity: profile.ethnicity?.ethnicity,
            sexualOrientation: profile.diversity?.sexualOrientation,
            genderIdentity: profile.diversity?.genderIdentity,
          }
        : undefined,
    physicalProfile: profile.physicalProfile,
    uniformSizes: profile.uniformSizes,
    professionalProfile: profile.professionalProfile,
    educations: profile.educations,
    certifications: undefined,
    availability: profile.availability,
    locationPreferences: profile.locationPreferences,
    professionalMedia: profile.professionalMedia
      ? {
          profilePictureUrl: profile.professionalMedia.profilePictureUrl,
          resumeUrl: profile.professionalMedia.resumeUrl,
          videoUrl: undefined,
        }
      : undefined,
  };

  return candidateProfile;
}

function toRecruiterProfileDto(
  profile?: RecruiterProfileInterface,
): RecruiterProfileDto | undefined {
  if (!profile) {
    return undefined;
  }

  return {
    companyName: undefined,
    companyDocument: profile.documents?.socialDocumentNumber
      ? masksUtils.companySocialDocumentMask(
          profile.documents.socialDocumentNumber,
        )
      : undefined,
    position: profile.position,
    phone: profile.phone?.phone
      ? masksUtils.phoneMask(profile.phone.phone)
      : undefined,
    website: undefined,
  };
}
