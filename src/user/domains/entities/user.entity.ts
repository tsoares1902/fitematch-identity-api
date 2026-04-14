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

export enum ProductPermissionEnum {
  VIEW_OWN_USER = 'view_own_user',
  EDIT_OWN_USER = 'edit_own_user',
  VIEW_OWN_SESSIONS = 'view_own_sessions',
  VIEW_JOBS = 'view_jobs',
  VIEW_JOB_DETAILS = 'view_job_details',
  APPLY_TO_JOBS = 'apply_to_jobs',
  VIEW_OWN_APPLIES = 'view_own_applies',
  CANCEL_OWN_APPLIES = 'cancel_own_applies',
  CREATE_JOBS = 'create_jobs',
  VIEW_OWN_COMPANY_JOBS = 'view_own_company_jobs',
  EDIT_OWN_COMPANY_JOBS = 'edit_own_company_jobs',
  DELETE_OWN_COMPANY_JOBS = 'delete_own_company_jobs',
  VIEW_OWN_COMPANY_APPLIES = 'view_own_company_applies',
  VIEW_OWN_COMPANY_CANDIDATES = 'view_own_company_candidates',
}

export enum AdminPermissionEnum {
  VIEW_USERS = 'view_users',
  CREATE_USERS = 'create_users',
  EDIT_USERS = 'edit_users',
  DELETE_USERS = 'delete_users',
  SUSPEND_USERS = 'suspend_users',
  BAN_USERS = 'ban_users',
  IMPERSONATE_USERS = 'impersonate_users',
  VIEW_COMPANIES = 'view_companies',
  CREATE_COMPANIES = 'create_companies',
  EDIT_COMPANIES = 'edit_companies',
  DELETE_COMPANIES = 'delete_companies',
  VIEW_JOBS = 'view_jobs',
  CREATE_JOBS = 'create_jobs',
  EDIT_JOBS = 'edit_jobs',
  DELETE_JOBS = 'delete_jobs',
  APPROVE_JOBS = 'approve_jobs',
  REJECT_JOBS = 'reject_jobs',
  PUBLISH_JOBS = 'publish_jobs',
  UNPUBLISH_JOBS = 'unpublish_jobs',
  VIEW_APPLIES = 'view_applies',
  CREATE_APPLIES = 'create_applies',
  EDIT_APPLIES = 'edit_applies',
  DELETE_APPLIES = 'delete_applies',
  VIEW_STAFF = 'view_staff',
  VIEW_ADMINS = 'view_admins',
  VIEW_AUDIT_LOGS = 'view_audit_logs',
}

export const PRODUCT_ROLE_PERMISSIONS: Readonly<
  Record<ProductRoleEnum, readonly ProductPermissionEnum[]>
> = {
  [ProductRoleEnum.CANDIDATE]: [
    ProductPermissionEnum.VIEW_OWN_USER,
    ProductPermissionEnum.EDIT_OWN_USER,
    ProductPermissionEnum.VIEW_OWN_SESSIONS,
    ProductPermissionEnum.VIEW_JOBS,
    ProductPermissionEnum.VIEW_JOB_DETAILS,
    ProductPermissionEnum.APPLY_TO_JOBS,
    ProductPermissionEnum.VIEW_OWN_APPLIES,
    ProductPermissionEnum.CANCEL_OWN_APPLIES,
  ],
  [ProductRoleEnum.RECRUITER]: [
    ProductPermissionEnum.VIEW_OWN_USER,
    ProductPermissionEnum.EDIT_OWN_USER,
    ProductPermissionEnum.VIEW_OWN_SESSIONS,
    ProductPermissionEnum.VIEW_JOBS,
    ProductPermissionEnum.VIEW_JOB_DETAILS,
    ProductPermissionEnum.CREATE_JOBS,
    ProductPermissionEnum.VIEW_OWN_COMPANY_JOBS,
    ProductPermissionEnum.EDIT_OWN_COMPANY_JOBS,
    ProductPermissionEnum.DELETE_OWN_COMPANY_JOBS,
    ProductPermissionEnum.VIEW_OWN_COMPANY_APPLIES,
    ProductPermissionEnum.VIEW_OWN_COMPANY_CANDIDATES,
  ],
};

export const ADMIN_ROLE_PERMISSIONS: Readonly<
  Record<AdminRoleEnum, readonly AdminPermissionEnum[]>
> = {
  [AdminRoleEnum.STAFF]: [
    AdminPermissionEnum.VIEW_USERS,
    AdminPermissionEnum.VIEW_COMPANIES,
    AdminPermissionEnum.VIEW_JOBS,
    AdminPermissionEnum.APPROVE_JOBS,
    AdminPermissionEnum.REJECT_JOBS,
    AdminPermissionEnum.VIEW_APPLIES,
    AdminPermissionEnum.VIEW_STAFF,
    AdminPermissionEnum.VIEW_ADMINS,
    AdminPermissionEnum.VIEW_AUDIT_LOGS,
  ],
  [AdminRoleEnum.ADMIN]: [
    AdminPermissionEnum.VIEW_USERS,
    AdminPermissionEnum.CREATE_USERS,
    AdminPermissionEnum.EDIT_USERS,
    AdminPermissionEnum.DELETE_USERS,
    AdminPermissionEnum.SUSPEND_USERS,
    AdminPermissionEnum.BAN_USERS,
    AdminPermissionEnum.IMPERSONATE_USERS,
    AdminPermissionEnum.VIEW_COMPANIES,
    AdminPermissionEnum.CREATE_COMPANIES,
    AdminPermissionEnum.EDIT_COMPANIES,
    AdminPermissionEnum.DELETE_COMPANIES,
    AdminPermissionEnum.VIEW_JOBS,
    AdminPermissionEnum.CREATE_JOBS,
    AdminPermissionEnum.EDIT_JOBS,
    AdminPermissionEnum.DELETE_JOBS,
    AdminPermissionEnum.APPROVE_JOBS,
    AdminPermissionEnum.REJECT_JOBS,
    AdminPermissionEnum.PUBLISH_JOBS,
    AdminPermissionEnum.UNPUBLISH_JOBS,
    AdminPermissionEnum.VIEW_APPLIES,
    AdminPermissionEnum.CREATE_APPLIES,
    AdminPermissionEnum.EDIT_APPLIES,
    AdminPermissionEnum.DELETE_APPLIES,
    AdminPermissionEnum.VIEW_STAFF,
    AdminPermissionEnum.VIEW_ADMINS,
    AdminPermissionEnum.VIEW_AUDIT_LOGS,
  ],
  [AdminRoleEnum.SUPER_ADMIN]: Object.values(AdminPermissionEnum),
};

export const PermissionEnum = AdminPermissionEnum;
export type PermissionEnum = AdminPermissionEnum;

export enum EthnicityEnum {
  WHITE = 'white',
  BLACK = 'black',
  BROWN = 'brown',
  ASIAN = 'asian',
  INDIGENOUS = 'indigenous',
  OTHER = 'other',
  PREFER_NOT_TO_SAY = 'prefer_not_to_say',
}

export enum SexualOrientationEnum {
  HETEROSEXUAL = 'heterosexual',
  HOMOSEXUAL = 'homosexual',
  BISEXUAL = 'bisexual',
  ASEXUAL = 'asexual',
  PANSEXUAL = 'pansexual',
  DEMISEXUAL = 'demisexual',
  QUEER = 'queer',
  QUESTIONING = 'questioning',
  OTHER = 'other',
  PREFER_NOT_TO_SAY = 'prefer_not_to_say',
}

export enum GenderIdentityEnum {
  MALE = 'male',
  FEMALE = 'female',
  TRANS_MALE = 'trans_male',
  TRANS_FEMALE = 'trans_female',
  NON_BINARY = 'non_binary',
  AGENDER = 'agender',
  GENDERFLUID = 'genderfluid',
  OTHER = 'other',
  PREFER_NOT_TO_SAY = 'prefer_not_to_say',
}

export enum ClothingSizeEnum {
  PP = 'PP',
  P = 'P',
  M = 'M',
  G = 'G',
  GG = 'GG',
  XGG = 'XGG',
  OTHER = 'other',
}

export enum EmploymentTypeEnum {
  CLT = 'clt',
  PJ = 'pj',
  FREELANCER = 'freelancer',
  TEMPORARY = 'temporary',
  INTERNSHIP = 'internship',
}

export enum WorkShiftEnum {
  MORNING = 'morning',
  AFTERNOON = 'afternoon',
  EVENING = 'evening',
  NIGHT = 'night',
  FLEXIBLE = 'flexible',
}

export enum EducationLevelEnum {
  HIGH_SCHOOL_COMPLETE = 'high_school_complete',
  COLLEGE_COMPLETE = 'college_complete',
  POSTGRADUATE_COMPLETE = 'postgraduate_complete',
  MASTER_COMPLETE = 'master_complete',
  DOCTORATE_COMPLETE = 'doctorate_complete',
  OTHER = 'other',
}

export enum EducationStatusEnum {
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  INTERRUPTED = 'interrupted',
}

export enum CourseTypeEnum {
  BACHELOR = 'bachelor',
  LICENSURE = 'licensure',
  TECHNICAL = 'technical',
  SPECIALIZATION = 'specialization',
  MBA = 'mba',
  MASTER = 'master',
  DOCTORATE = 'doctorate',
  OTHER = 'other',
}

export enum AvailabilityDayEnum {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday',
}

export enum WorkModelEnum {
  ON_SITE = 'on_site',
  REMOTE = 'remote',
  HYBRID = 'hybrid',
}

export interface PersonDocumentsEntity {
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

export interface CompanyDocumentsEntity {
  socialDocumentNumber?: string;
}

export interface PhoneEntity {
  phone?: string;
  isWhatsapp?: boolean;
  isTelegram?: boolean;
}

export interface AddressEntity {
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
}

export interface SocialEntity {
  facebook?: string;
  instagram?: string;
  x?: string;
  linkedin?: string;
}

export interface EthnicityEntity {
  ethnicity?: string;
}

export interface DiversityEntity {
  sexualOrientation?: string;
  genderIdentity?: string;
}

export interface PhysicalProfileEntity {
  heightCm?: number;
  weightKg?: number;
}

export interface UniformSizesEntity {
  tShirt?: string;
  shorts?: string;
  pants?: string;
  shoeSizeBr?: number;
}

export interface ProfessionalProfileEntity {
  headline?: string;
  bio?: string;
  yearsOfExperience?: number;
  specialties?: string[];
  employmentTypes?: string[];
  workShifts?: string[];
}

export interface EducationEntity {
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

export interface ExperienceEntity {
  companyName?: string;
  position?: string;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  description?: string;
}

export interface AvailabilityEntity {
  availableDays?: string[];
  availableShifts?: string[];
  acceptsWeekends?: boolean;
}

export interface LocationPreferencesEntity {
  preferredCities?: string[];
  preferredStates?: string[];
  workModels?: string[];
}

export interface ProfessionalMediaEntity {
  profilePictureUrl?: string;
  resumeUrl?: string;
}

export interface CandidateProfileEntity {
  documents?: PersonDocumentsEntity;
  phone?: PhoneEntity;
  address?: AddressEntity;
  social?: SocialEntity;
  ethnicity?: EthnicityEntity;
  diversity?: DiversityEntity;
  physicalProfile?: PhysicalProfileEntity;
  uniformSizes?: UniformSizesEntity;
  professionalProfile?: ProfessionalProfileEntity;
  educations?: EducationEntity[];
  experiences?: ExperienceEntity[];
  availability?: AvailabilityEntity;
  locationPreferences?: LocationPreferencesEntity;
  professionalMedia?: ProfessionalMediaEntity;
}

export interface RecruiterProfileEntity {
  position?: string;
  documents?: CompanyDocumentsEntity;
  phone?: PhoneEntity;
  address?: AddressEntity;
}

export interface UserEntity {
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
  candidateProfile?: CandidateProfileEntity;
  recruiterProfile?: RecruiterProfileEntity;
  accountVerifiedAt?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type User = UserEntity;
