export enum UserStatusEnum {
  PENDING_ACCOUNT_CONFIRMATION = 'pending_account_confirmation',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  DEACTIVATED = 'deactivated',
  BANNED = 'banned',
}

export enum ProductRoleEnum {
  CANDIDATE = 'candidate',
  RECRUITER = 'recruiter',
}

export enum AdminRoleEnum {
  STAFF = 'staff',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

export interface PersonDocumentsInterface {
  identityDocumentNumber?: string;
  identityIssuer?: string;
  identityState?: string;
  socialDocumentNumber?: string;
  passportNumber?: string;
  passportCountry?: string;
  passportExpirationDate?: string;
  crefNumber?: string;
  crefState?: string;
}

export interface CompanyDocumentsInterface {
  socialDocumentNumber?: string;
}

export interface PhoneInterface {
  phone?: string;
  isWhatsapp?: boolean;
  isTelegram?: boolean;
}

export interface AddressInterface {
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
}

export interface SocialInterface {
  facebook?: string;
  instagram?: string;
  x?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
  website?: string;
}

export interface EthnicityInterface {
  ethnicity?: string;
}

export interface DiversityInterface {
  sexualOrientation?: string;
  genderIdentity?: string;
}

export interface PhysicalProfileInterface {
  heightCm?: number;
  weightKg?: number;
}

export interface UniformSizesInterface {
  tShirt?: string;
  shorts?: string;
  pants?: string;
  shoeSizeBr?: number;
}

export interface ProfessionalProfileInterface {
  headline?: string;
  bio?: string;
  yearsOfExperience?: number;
  specialties?: string[];
  employmentTypes?: string[];
  workShifts?: string[];
}

export interface EducationInterface {
  level?: string;
  status?: string;
  courseType?: string;
  courseName?: string;
  institution?: string;
  startYear?: number;
  conclusionYear?: number;
  expectedConclusionYear?: number;
  isCurrentlyStudying?: boolean;
}

export interface ExperienceInterface {
  companyName?: string;
  position?: string;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  description?: string;
}

export interface AvailabilityInterface {
  availableDays?: string[];
  availableShifts?: string[];
  acceptsWeekends?: boolean;
}

export interface LocationPreferencesInterface {
  preferredCities?: string[];
  preferredStates?: string[];
  workModels?: string[];
}

export interface ProfessionalMediaInterface {
  profilePictureUrl?: string;
  resumeUrl?: string;
}

export interface CandidateProfileInterface {
  documents?: PersonDocumentsInterface;
  phone?: PhoneInterface;
  address?: AddressInterface;
  social?: SocialInterface;
  ethnicity?: EthnicityInterface;
  diversity?: DiversityInterface;
  physicalProfile?: PhysicalProfileInterface;
  uniformSizes?: UniformSizesInterface;
  professionalProfile?: ProfessionalProfileInterface;
  educations?: EducationInterface[];
  experiences?: ExperienceInterface[];
  availability?: AvailabilityInterface;
  locationPreferences?: LocationPreferencesInterface;
  professionalMedia?: ProfessionalMediaInterface;
}

export interface RecruiterProfileInterface {
  position?: string;
  documents?: CompanyDocumentsInterface;
  phone?: PhoneInterface;
  address?: AddressInterface;
}

export interface UserInterface {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
  status: string;
  productRole?: string;
  productPermissions?: string[];
  adminRole?: string;
  adminPermissions?: string[];
  permissions?: string[];
  isInternal?: boolean;
  candidateProfile?: CandidateProfileInterface;
  recruiterProfile?: RecruiterProfileInterface;
  accountVerifiedAt?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
