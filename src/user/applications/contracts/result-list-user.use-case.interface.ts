import type {
  AdminRoleEnum,
  PermissionEnum,
  ProductRoleEnum,
  UserStatusEnum,
} from '@src/user/domains/entities/user.entity';

export interface ListUsersOutputDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthday?: string;
  status: UserStatusEnum;
  productRole?: ProductRoleEnum;
  adminRole?: AdminRoleEnum;
  permissions?: PermissionEnum[];
  isInternal?: boolean;
  candidateProfile?: {
    documents?: {
      identityDocumentNumber?: string;
      identityIssuer?: string;
      identityState?: string;
      socialDocumentNumber?: string;
      passportNumber?: string;
      passportCountry?: string;
      passportExpirationDate?: string;
      crefNumber?: string;
      crefState?: string;
    };
    contacts?: {
      phone?: string;
      isWhatsapp?: boolean;
      isTelegram?: boolean;
      street?: string;
      number?: string;
      complement?: string;
      neighborhood?: string;
      city?: string;
      state?: string;
      country?: string;
      zipCode?: string;
    };
    social?: {
      instagram?: string;
      linkedin?: string;
      youtube?: string;
      website?: string;
    };
    demographics?: {
      ethnicity?: string;
      sexualOrientation?: string;
      genderIdentity?: string;
    };
    physicalProfile?: {
      heightCm?: number;
      weightKg?: number;
    };
    uniformSizes?: {
      tShirt?: string;
      shorts?: string;
      pants?: string;
      shoeSizeBr?: number;
    };
    professionalProfile?: {
      headline?: string;
      bio?: string;
      yearsOfExperience?: number;
      specialties?: string[];
      employmentTypes?: string[];
      workShifts?: string[];
    };
    educations?: Array<{
      level?: string;
      status?: string;
      courseType?: string;
      courseName?: string;
      institution?: string;
      startYear?: number;
      conclusionYear?: number;
      expectedConclusionYear?: number;
      isCurrentlyStudying?: boolean;
    }>;
    certifications?: Array<{
      name: string;
      issuer?: string;
      issueDate?: string;
      expirationDate?: string;
    }>;
    availability?: {
      availableDays?: string[];
      availableShifts?: string[];
      acceptsWeekends?: boolean;
    };
    locationPreferences?: {
      preferredCities?: string[];
      preferredStates?: string[];
      workModels?: string[];
    };
    professionalMedia?: {
      profilePictureUrl?: string;
      resumeUrl?: string;
      videoUrl?: string;
    };
  };
  recruiterProfile?: {
    companyName?: string;
    companyDocument?: string;
    position?: string;
    phone?: string;
    website?: string;
  };
  emailVerifiedAt?: string;
  createdBy?: string;
  lastLoginAt?: string;
  suspendedAt?: string;
  suspendedReason?: string;
  deactivatedAt?: string;
  deactivatedReason?: string;
  bannedAt?: string;
  bannedReason?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ListUsersPaginationOutputDto {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface ResultListUserUseCaseInterface {
  data: ListUsersOutputDto[];
  pagination: ListUsersPaginationOutputDto;
}
