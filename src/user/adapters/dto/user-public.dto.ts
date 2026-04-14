import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  AdminPermissionEnum,
  AvailabilityDayEnum,
  ClothingSizeEnum,
  CourseTypeEnum,
  EducationLevelEnum,
  EducationStatusEnum,
  EmploymentTypeEnum,
  EthnicityEnum,
  GenderIdentityEnum,
  ProductPermissionEnum,
  ProductRoleEnum,
  SexualOrientationEnum,
  UserStatusEnum,
  WorkModelEnum,
  WorkShiftEnum,
} from '@src/user/domains/entities/user.entity';

export class DocumentsDto {
  @ApiPropertyOptional()
  identityDocumentNumber?: string;

  @ApiPropertyOptional()
  identityIssuer?: string;

  @ApiPropertyOptional()
  identityState?: string;

  @ApiPropertyOptional()
  socialDocumentNumber?: string;

  @ApiPropertyOptional()
  passportNumber?: string;

  @ApiPropertyOptional()
  passportCountry?: string;

  @ApiPropertyOptional()
  passportExpirationDate?: string;

  @ApiPropertyOptional()
  crefNumber?: string;

  @ApiPropertyOptional()
  crefState?: string;
}

export class ContactsDto {
  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional()
  isWhatsapp?: boolean;

  @ApiPropertyOptional()
  isTelegram?: boolean;

  @ApiPropertyOptional()
  street?: string;

  @ApiPropertyOptional()
  number?: string;

  @ApiPropertyOptional()
  complement?: string;

  @ApiPropertyOptional()
  neighborhood?: string;

  @ApiPropertyOptional()
  city?: string;

  @ApiPropertyOptional()
  state?: string;

  @ApiPropertyOptional()
  country?: string;

  @ApiPropertyOptional()
  zipCode?: string;
}

export class SocialDto {
  @ApiPropertyOptional()
  instagram?: string;

  @ApiPropertyOptional()
  linkedin?: string;

  @ApiPropertyOptional()
  youtube?: string;

  @ApiPropertyOptional()
  website?: string;
}

export class DemographicsDto {
  @ApiPropertyOptional({ enum: EthnicityEnum })
  ethnicity?: string;

  @ApiPropertyOptional({ enum: SexualOrientationEnum })
  sexualOrientation?: string;

  @ApiPropertyOptional({ enum: GenderIdentityEnum })
  genderIdentity?: string;
}

export class PhysicalProfileDto {
  @ApiPropertyOptional()
  heightCm?: number;

  @ApiPropertyOptional()
  weightKg?: number;
}

export class UniformSizesDto {
  @ApiPropertyOptional({ enum: ClothingSizeEnum })
  tShirt?: string;

  @ApiPropertyOptional({ enum: ClothingSizeEnum })
  shorts?: string;

  @ApiPropertyOptional({ enum: ClothingSizeEnum })
  pants?: string;

  @ApiPropertyOptional()
  shoeSizeBr?: number;
}

export class ProfessionalProfileDto {
  @ApiPropertyOptional()
  headline?: string;

  @ApiPropertyOptional()
  bio?: string;

  @ApiPropertyOptional()
  yearsOfExperience?: number;

  @ApiPropertyOptional({ type: [String] })
  specialties?: string[];

  @ApiPropertyOptional({ enum: EmploymentTypeEnum, isArray: true })
  employmentTypes?: string[];

  @ApiPropertyOptional({ enum: WorkShiftEnum, isArray: true })
  workShifts?: string[];
}

export class EducationDto {
  @ApiPropertyOptional({ enum: EducationLevelEnum })
  level?: string;

  @ApiPropertyOptional({ enum: EducationStatusEnum })
  status?: string;

  @ApiPropertyOptional({ enum: CourseTypeEnum })
  courseType?: string;

  @ApiPropertyOptional()
  courseName?: string;

  @ApiPropertyOptional()
  institution?: string;

  @ApiPropertyOptional()
  startYear?: number;

  @ApiPropertyOptional()
  conclusionYear?: number;

  @ApiPropertyOptional()
  expectedConclusionYear?: number;

  @ApiPropertyOptional()
  isCurrentlyStudying?: boolean;
}

export class CertificationDto {
  @ApiProperty()
  name!: string;

  @ApiPropertyOptional()
  issuer?: string;

  @ApiPropertyOptional()
  issueDate?: string;

  @ApiPropertyOptional()
  expirationDate?: string;
}

export class AvailabilityDto {
  @ApiPropertyOptional({ enum: AvailabilityDayEnum, isArray: true })
  availableDays?: string[];

  @ApiPropertyOptional({ enum: WorkShiftEnum, isArray: true })
  availableShifts?: string[];

  @ApiPropertyOptional()
  acceptsWeekends?: boolean;
}

export class LocationPreferencesDto {
  @ApiPropertyOptional({ type: [String] })
  preferredCities?: string[];

  @ApiPropertyOptional({ type: [String] })
  preferredStates?: string[];

  @ApiPropertyOptional({ enum: WorkModelEnum, isArray: true })
  workModels?: string[];
}

export class ProfessionalMediaDto {
  @ApiPropertyOptional()
  profilePictureUrl?: string;

  @ApiPropertyOptional()
  resumeUrl?: string;

  @ApiPropertyOptional()
  videoUrl?: string;
}

export class CandidateProfileDto {
  @ApiPropertyOptional({ type: DocumentsDto })
  documents?: DocumentsDto;

  @ApiPropertyOptional({ type: ContactsDto })
  contacts?: ContactsDto;

  @ApiPropertyOptional({ type: SocialDto })
  social?: SocialDto;

  @ApiPropertyOptional({ type: DemographicsDto })
  demographics?: DemographicsDto;

  @ApiPropertyOptional({ type: PhysicalProfileDto })
  physicalProfile?: PhysicalProfileDto;

  @ApiPropertyOptional({ type: UniformSizesDto })
  uniformSizes?: UniformSizesDto;

  @ApiPropertyOptional({ type: ProfessionalProfileDto })
  professionalProfile?: ProfessionalProfileDto;

  @ApiPropertyOptional({ type: [EducationDto] })
  educations?: EducationDto[];

  @ApiPropertyOptional({ type: [CertificationDto] })
  certifications?: CertificationDto[];

  @ApiPropertyOptional({ type: AvailabilityDto })
  availability?: AvailabilityDto;

  @ApiPropertyOptional({ type: LocationPreferencesDto })
  locationPreferences?: LocationPreferencesDto;

  @ApiPropertyOptional({ type: ProfessionalMediaDto })
  professionalMedia?: ProfessionalMediaDto;
}

export class RecruiterProfileDto {
  @ApiPropertyOptional()
  companyName?: string;

  @ApiPropertyOptional()
  companyDocument?: string;

  @ApiPropertyOptional()
  position?: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional()
  website?: string;
}

export class UserPublicDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  firstName!: string;

  @ApiProperty()
  lastName!: string;

  @ApiProperty()
  email!: string;

  @ApiPropertyOptional()
  birthday?: string;

  @ApiProperty({ enum: UserStatusEnum })
  status!: string;

  @ApiPropertyOptional({ enum: ProductRoleEnum })
  productRole?: string;

  @ApiPropertyOptional({ type: [String], enum: ProductPermissionEnum })
  productPermissions?: string[];

  @ApiPropertyOptional({ enum: ['staff', 'admin', 'super_admin'] })
  adminRole?: string;

  @ApiPropertyOptional({ type: [String], enum: AdminPermissionEnum })
  adminPermissions?: string[];

  @ApiPropertyOptional({ type: [String], enum: AdminPermissionEnum })
  permissions?: string[];

  @ApiPropertyOptional()
  isInternal?: boolean;

  @ApiPropertyOptional({ type: CandidateProfileDto })
  candidateProfile?: CandidateProfileDto;

  @ApiPropertyOptional({ type: RecruiterProfileDto })
  recruiterProfile?: RecruiterProfileDto;

  @ApiPropertyOptional()
  emailVerifiedAt?: string;

  @ApiPropertyOptional()
  createdBy?: string;

  @ApiPropertyOptional()
  lastLoginAt?: string;

  @ApiPropertyOptional()
  suspendedAt?: string;

  @ApiPropertyOptional()
  suspendedReason?: string;

  @ApiPropertyOptional()
  deactivatedAt?: string;

  @ApiPropertyOptional()
  deactivatedReason?: string;

  @ApiPropertyOptional()
  bannedAt?: string;

  @ApiPropertyOptional()
  bannedReason?: string;

  @ApiPropertyOptional()
  createdAt?: Date;

  @ApiPropertyOptional()
  updatedAt?: Date;
}
