export enum UserStatusEnum {
  PENDING_EMAIL_VERIFICATION = 'pending_email_verification', // User exists but has not verified email yet
  ACTIVE = 'active', // User is active and allowed to use the product
  SUSPENDED = 'suspended', // User is temporarily suspended
  DEACTIVATED = 'deactivated', // User account was deactivated
  BANNED = 'banned', // User is permanently banned
}

export enum ProductRoleEnum {
  CANDIDATE = 'candidate', // Product user who applies to opportunities
  RECRUITER = 'recruiter', // Product user who manages recruiting flows
}

export enum AdminRoleEnum {
  STAFF = 'staff', // Internal user with limited dashboard permissions
  ADMIN = 'admin', // Internal user with elevated dashboard permissions
  SUPER_ADMIN = 'super_admin', // Internal user with full dashboard permissions
}

export enum PermissionEnum {
  VIEW_USERS = 'view_users', // Allows viewing users in the dashboard
  EDIT_USERS = 'edit_users', // Allows editing users in the dashboard
  SUSPEND_USERS = 'suspend_users', // Allows suspending users
  BAN_USERS = 'ban_users', // Allows banning users
  VIEW_RECRUITERS = 'view_recruiters', // Allows viewing recruiter accounts
  EDIT_RECRUITERS = 'edit_recruiters', // Allows editing recruiter accounts
  VIEW_JOBS = 'view_jobs', // Allows viewing jobs in the dashboard
  EDIT_JOBS = 'edit_jobs', // Allows editing jobs
  DELETE_JOBS = 'delete_jobs', // Allows deleting jobs
  VIEW_APPLICATIONS = 'view_applications', // Allows viewing applications
  EDIT_APPLICATIONS = 'edit_applications', // Allows editing applications
  MANAGE_STAFF = 'manage_staff', // Allows managing internal staff users
  MANAGE_ADMINS = 'manage_admins', // Allows managing admin users
  IMPERSONATE_USERS = 'impersonate_users', // Allows impersonating another user
  MANAGE_SYSTEM_SETTINGS = 'manage_system_settings', // Allows changing system settings
}

export enum EthnicityEnum {
  WHITE = 'white', // White
  BLACK = 'black', // Black
  BROWN = 'brown', // Brown
  ASIAN = 'asian', // Asian
  INDIGENOUS = 'indigenous', // Indigenous
  OTHER = 'other', // Other
  PREFER_NOT_TO_SAY = 'prefer_not_to_say', // Prefer not to say
}

export enum SexualOrientationEnum {
  HETEROSEXUAL = 'heterosexual', // Heterosexual
  HOMOSEXUAL = 'homosexual', // Homosexual
  BISEXUAL = 'bisexual', // Bisexual
  ASEXUAL = 'asexual', // Asexual
  PANSEXUAL = 'pansexual', // Pansexual
  DEMISEXUAL = 'demisexual', // Demisexual
  QUEER = 'queer', // Queer
  QUESTIONING = 'questioning', // Questioning
  OTHER = 'other', // Other
  PREFER_NOT_TO_SAY = 'prefer_not_to_say', // Prefer not to say
}

export enum GenderIdentityEnum {
  MALE = 'male', // Male
  FEMALE = 'female', // Female
  TRANS_MALE = 'trans_male', // Trans man
  TRANS_FEMALE = 'trans_female', // Trans woman
  NON_BINARY = 'non_binary', // Non-binary
  AGENDER = 'agender', // Agender
  GENDERFLUID = 'genderfluid', // Genderfluid
  OTHER = 'other', // Other
  PREFER_NOT_TO_SAY = 'prefer_not_to_say', // Prefer not to say
}

export enum ClothingSizeEnum {
  PP = 'PP', // Extra small
  P = 'P', // Small
  M = 'M', // Medium
  G = 'G', // Large
  GG = 'GG', // Extra large
  XGG = 'XGG', // Double extra large
  OTHER = 'other', // Other size
}

export enum EmploymentTypeEnum {
  CLT = 'clt', // Brazilian employment contract
  PJ = 'pj', // Independent legal entity contract
  FREELANCER = 'freelancer', // Freelance contract
  TEMPORARY = 'temporary', // Temporary contract
  INTERNSHIP = 'internship', // Internship
}

export enum WorkShiftEnum {
  MORNING = 'morning', // Morning shift
  AFTERNOON = 'afternoon', // Afternoon shift
  EVENING = 'evening', // Evening shift
  NIGHT = 'night', // Night shift
  FLEXIBLE = 'flexible', // Flexible schedule
}

export enum EducationLevelEnum {
  HIGH_SCHOOL_COMPLETE = 'high_school_complete', // High school completed
  COLLEGE_COMPLETE = 'college_complete', // College completed
  POSTGRADUATE_COMPLETE = 'postgraduate_complete', // Postgraduate completed
  MASTER_COMPLETE = 'master_complete', // Master degree completed
  DOCTORATE_COMPLETE = 'doctorate_complete', // Doctorate completed
  OTHER = 'other', // Other education level
}

export enum EducationStatusEnum {
  IN_PROGRESS = 'in_progress', // Currently studying
  COMPLETED = 'completed', // Education completed
  INTERRUPTED = 'interrupted', // Education interrupted
}

export enum CourseTypeEnum {
  BACHELOR = 'bachelor', // Bachelor course
  LICENSURE = 'licensure', // Licensure course
  TECHNICAL = 'technical', // Technical course
  SPECIALIZATION = 'specialization', // Specialization course
  MBA = 'mba', // MBA course
  MASTER = 'master', // Master degree
  DOCTORATE = 'doctorate', // Doctorate degree
  OTHER = 'other', // Other course type
}

export enum AvailabilityDayEnum {
  MONDAY = 'monday', // Monday
  TUESDAY = 'tuesday', // Tuesday
  WEDNESDAY = 'wednesday', // Wednesday
  THURSDAY = 'thursday', // Thursday
  FRIDAY = 'friday', // Friday
  SATURDAY = 'saturday', // Saturday
  SUNDAY = 'sunday', // Sunday
}

export enum WorkModelEnum {
  ON_SITE = 'on_site', // On-site work
  REMOTE = 'remote', // Remote work
  HYBRID = 'hybrid', // Hybrid work
}

export interface Documents {
  identityDocumentNumber?: string; // Identity document number
  identityIssuer?: string; // Identity document issuer
  identityState?: string; // State of identity document issuance
  socialDocumentNumber?: string; // Social document number, such as CPF
  passportNumber?: string; // Passport number
  passportCountry?: string; // Country that issued the passport
  passportExpirationDate?: string; // Passport expiration date in ISO-like string format
  crefNumber?: string; // Professional CREF registration number
  crefState?: string; // State of the CREF registration
}

export interface Contacts {
  phone?: string; // Primary phone number
  isWhatsapp?: boolean; // Whether the phone supports WhatsApp
  isTelegram?: boolean; // Whether the phone supports Telegram
  street?: string; // Street name
  number?: string; // Address number
  complement?: string; // Address complement
  neighborhood?: string; // Neighborhood or district
  city?: string; // City
  state?: string; // State or province
  country?: string; // Country
  zipCode?: string; // Postal or ZIP code
}

export interface Social {
  instagram?: string; // Instagram profile or handle
  linkedin?: string; // LinkedIn profile
  youtube?: string; // YouTube profile or channel
  website?: string; // Personal or professional website
}

export interface Demographics {
  ethnicity?: EthnicityEnum; // Self-declared ethnicity
  sexualOrientation?: SexualOrientationEnum; // Self-declared sexual orientation
  genderIdentity?: GenderIdentityEnum; // Self-declared gender identity
}

export interface PhysicalProfile {
  heightCm?: number; // Height in centimeters
  weightKg?: number; // Weight in kilograms
}

export interface UniformSizes {
  tShirt?: ClothingSizeEnum; // T-shirt size
  shorts?: ClothingSizeEnum; // Shorts size
  pants?: ClothingSizeEnum; // Pants size
  shoeSizeBr?: number; // Shoe size in Brazilian sizing
}

export interface ProfessionalProfile {
  headline?: string; // Professional headline
  bio?: string; // Professional summary or biography
  yearsOfExperience?: number; // Number of years of experience
  specialties?: string[]; // Main professional specialties
  employmentTypes?: EmploymentTypeEnum[]; // Accepted employment types
  workShifts?: WorkShiftEnum[]; // Available work shifts
}

export interface Education {
  level?: EducationLevelEnum; // Education level
  status?: EducationStatusEnum; // Current education status
  courseType?: CourseTypeEnum; // Type of course
  courseName?: string; // Name of the course
  institution?: string; // Institution name
  startYear?: number; // Start year
  conclusionYear?: number; // Conclusion year
  expectedConclusionYear?: number; // Expected conclusion year
  isCurrentlyStudying?: boolean; // Whether the user is currently studying
}

export interface Certification {
  name: string; // Certification name
  issuer?: string; // Certification issuer
  issueDate?: string; // Certification issue date
  expirationDate?: string; // Certification expiration date
}

export interface Availability {
  availableDays?: AvailabilityDayEnum[]; // Available days of the week
  availableShifts?: WorkShiftEnum[]; // Available work shifts
  acceptsWeekends?: boolean; // Whether the user accepts weekend work
}

export interface LocationPreferences {
  preferredCities?: string[]; // Preferred work cities
  preferredStates?: string[]; // Preferred work states
  workModels?: WorkModelEnum[]; // Accepted work models
}

export interface ProfessionalMedia {
  profilePictureUrl?: string; // Profile picture URL
  resumeUrl?: string; // Resume URL
  videoUrl?: string; // Presentation video URL
}

export interface CandidateProfile {
  documents?: Documents; // Candidate identification and professional documents
  contacts?: Contacts; // Candidate contact and address data
  social?: Social; // Candidate social and professional links
  demographics?: Demographics; // Candidate demographic information
  physicalProfile?: PhysicalProfile; // Candidate physical profile
  uniformSizes?: UniformSizes; // Candidate uniform sizes
  professionalProfile?: ProfessionalProfile; // Candidate professional summary
  educations?: Education[]; // Candidate education history
  certifications?: Certification[]; // Candidate certifications
  availability?: Availability; // Candidate availability
  locationPreferences?: LocationPreferences; // Candidate location preferences
  professionalMedia?: ProfessionalMedia; // Candidate professional media assets
}

export interface RecruiterProfile {
  companyName?: string; // Recruiter company name
  companyDocument?: string; // Recruiter company legal document
  position?: string; // Recruiter position in the company
  phone?: string; // Recruiter company or direct phone
  website?: string; // Recruiter company website
}

// =========================
// ROOT ENTITY
// =========================

export interface User {
  id: string; // Unique user identifier
  firstName: string; // User first name
  lastName: string; // User last name
  email: string; // User email address
  birthday?: string; // User birth date
  status: UserStatusEnum; // Current lifecycle status of the user
  productRole?: ProductRoleEnum; // Product role used inside the core product
  adminRole?: AdminRoleEnum; // Dashboard role for internal administration
  permissions?: PermissionEnum[]; // Explicit dashboard permissions
  isInternal?: boolean; // Whether the user is an internal dashboard user
  candidateProfile?: CandidateProfile; // Candidate-specific profile data
  recruiterProfile?: RecruiterProfile; // Recruiter-specific profile data
  emailVerifiedAt?: string; // Timestamp of email verification
  createdBy?: string; // Identifier of the actor who created this user
  lastLoginAt?: string; // Timestamp of last login
  suspendedAt?: string; // Timestamp of suspension
  suspendedReason?: string; // Reason for suspension
  deactivatedAt?: string; // Timestamp of deactivation
  deactivatedReason?: string; // Reason for deactivation
  bannedAt?: string; // Timestamp of ban
  bannedReason?: string; // Reason for ban
  createdAt?: Date; // Timestamp of entity creation
  updatedAt?: Date; // Timestamp of last entity update
}
