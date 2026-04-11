export interface DocumentsInterface {
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

export interface ContactsInterface {
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
}

export interface SocialInterface {
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  website?: string;
}

export interface DemographicsInterface {
  ethnicity?: string;
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

export interface CertificationInterface {
  name: string;
  issuer?: string;
  issueDate?: string;
  expirationDate?: string;
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
  videoUrl?: string;
}

export interface CandidateProfileInterface {
  documents?: DocumentsInterface;
  contacts?: ContactsInterface;
  social?: SocialInterface;
  demographics?: DemographicsInterface;
  physicalProfile?: PhysicalProfileInterface;
  uniformSizes?: UniformSizesInterface;
  professionalProfile?: ProfessionalProfileInterface;
  educations?: EducationInterface[];
  certifications?: CertificationInterface[];
  availability?: AvailabilityInterface;
  locationPreferences?: LocationPreferencesInterface;
  professionalMedia?: ProfessionalMediaInterface;
}

export interface RecruiterProfileInterface {
  companyName?: string;
  companyDocument?: string;
  position?: string;
  phone?: string;
  website?: string;
}

export interface UserInterface {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  birthday?: string;
  status: string;
  productRole?: string;
  adminRole?: string;
  permissions?: string[];
  isInternal?: boolean;
  candidateProfile?: CandidateProfileInterface;
  recruiterProfile?: RecruiterProfileInterface;
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
