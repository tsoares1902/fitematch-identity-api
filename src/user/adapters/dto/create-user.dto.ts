import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import {
  AdminRoleEnum,
  AvailabilityDayEnum,
  ClothingSizeEnum,
  CourseTypeEnum,
  EducationLevelEnum,
  EducationStatusEnum,
  EmploymentTypeEnum,
  EthnicityEnum,
  GenderIdentityEnum,
  PermissionEnum,
  ProductRoleEnum,
  SexualOrientationEnum,
  UserStatusEnum,
  WorkModelEnum,
  WorkShiftEnum,
} from '@src/user/domains/entities/user.entity';

class DocumentsInputDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  identityDocumentNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  identityIssuer?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  identityState?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  socialDocumentNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  passportNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  passportCountry?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  passportExpirationDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  crefNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  crefState?: string;
}

class ContactsInputDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isWhatsapp?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isTelegram?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  street?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  number?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  complement?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  neighborhood?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  zipCode?: string;
}

class SocialInputDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  instagram?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  linkedin?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  youtube?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  website?: string;
}

class DemographicsInputDto {
  @ApiPropertyOptional({ enum: EthnicityEnum })
  @IsOptional()
  @IsEnum(EthnicityEnum)
  ethnicity?: EthnicityEnum;

  @ApiPropertyOptional({ enum: SexualOrientationEnum })
  @IsOptional()
  @IsEnum(SexualOrientationEnum)
  sexualOrientation?: SexualOrientationEnum;

  @ApiPropertyOptional({ enum: GenderIdentityEnum })
  @IsOptional()
  @IsEnum(GenderIdentityEnum)
  genderIdentity?: GenderIdentityEnum;
}

class PhysicalProfileInputDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  heightCm?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  weightKg?: number;
}

class UniformSizesInputDto {
  @ApiPropertyOptional({ enum: ClothingSizeEnum })
  @IsOptional()
  @IsEnum(ClothingSizeEnum)
  tShirt?: ClothingSizeEnum;

  @ApiPropertyOptional({ enum: ClothingSizeEnum })
  @IsOptional()
  @IsEnum(ClothingSizeEnum)
  shorts?: ClothingSizeEnum;

  @ApiPropertyOptional({ enum: ClothingSizeEnum })
  @IsOptional()
  @IsEnum(ClothingSizeEnum)
  pants?: ClothingSizeEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  shoeSizeBr?: number;
}

class ProfessionalProfileInputDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  headline?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  yearsOfExperience?: number;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  specialties?: string[];

  @ApiPropertyOptional({ enum: EmploymentTypeEnum, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(EmploymentTypeEnum, { each: true })
  employmentTypes?: EmploymentTypeEnum[];

  @ApiPropertyOptional({ enum: WorkShiftEnum, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(WorkShiftEnum, { each: true })
  workShifts?: WorkShiftEnum[];
}

class EducationInputDto {
  @ApiPropertyOptional({ enum: EducationLevelEnum })
  @IsOptional()
  @IsEnum(EducationLevelEnum)
  level?: EducationLevelEnum;

  @ApiPropertyOptional({ enum: EducationStatusEnum })
  @IsOptional()
  @IsEnum(EducationStatusEnum)
  status?: EducationStatusEnum;

  @ApiPropertyOptional({ enum: CourseTypeEnum })
  @IsOptional()
  @IsEnum(CourseTypeEnum)
  courseType?: CourseTypeEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  courseName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  institution?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  startYear?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  conclusionYear?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  expectedConclusionYear?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isCurrentlyStudying?: boolean;
}

class CertificationInputDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  issuer?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  issueDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  expirationDate?: string;
}

class AvailabilityInputDto {
  @ApiPropertyOptional({ enum: AvailabilityDayEnum, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(AvailabilityDayEnum, { each: true })
  availableDays?: AvailabilityDayEnum[];

  @ApiPropertyOptional({ enum: WorkShiftEnum, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(WorkShiftEnum, { each: true })
  availableShifts?: WorkShiftEnum[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  acceptsWeekends?: boolean;
}

class LocationPreferencesInputDto {
  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  preferredCities?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  preferredStates?: string[];

  @ApiPropertyOptional({ enum: WorkModelEnum, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(WorkModelEnum, { each: true })
  workModels?: WorkModelEnum[];
}

class ProfessionalMediaInputDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  profilePictureUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  resumeUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  videoUrl?: string;
}

class CandidateProfileInputDto {
  @ApiPropertyOptional({ type: DocumentsInputDto })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => DocumentsInputDto)
  documents?: DocumentsInputDto;

  @ApiPropertyOptional({ type: ContactsInputDto })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ContactsInputDto)
  contacts?: ContactsInputDto;

  @ApiPropertyOptional({ type: SocialInputDto })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => SocialInputDto)
  social?: SocialInputDto;

  @ApiPropertyOptional({ type: DemographicsInputDto })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => DemographicsInputDto)
  demographics?: DemographicsInputDto;

  @ApiPropertyOptional({ type: PhysicalProfileInputDto })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PhysicalProfileInputDto)
  physicalProfile?: PhysicalProfileInputDto;

  @ApiPropertyOptional({ type: UniformSizesInputDto })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UniformSizesInputDto)
  uniformSizes?: UniformSizesInputDto;

  @ApiPropertyOptional({ type: ProfessionalProfileInputDto })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ProfessionalProfileInputDto)
  professionalProfile?: ProfessionalProfileInputDto;

  @ApiPropertyOptional({ type: [EducationInputDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationInputDto)
  educations?: EducationInputDto[];

  @ApiPropertyOptional({ type: [CertificationInputDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CertificationInputDto)
  certifications?: CertificationInputDto[];

  @ApiPropertyOptional({ type: AvailabilityInputDto })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => AvailabilityInputDto)
  availability?: AvailabilityInputDto;

  @ApiPropertyOptional({ type: LocationPreferencesInputDto })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => LocationPreferencesInputDto)
  locationPreferences?: LocationPreferencesInputDto;

  @ApiPropertyOptional({ type: ProfessionalMediaInputDto })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ProfessionalMediaInputDto)
  professionalMedia?: ProfessionalMediaInputDto;
}

class RecruiterProfileInputDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyDocument?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  position?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  website?: string;
}

export class CreateUserDto {
  @ApiProperty({ example: 'John', minLength: 2, maxLength: 255 })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  firstName!: string;

  @ApiProperty({ example: 'Doe', minLength: 2, maxLength: 255 })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  lastName!: string;

  @ApiProperty({ example: 'john@example.com', maxLength: 255 })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email!: string;

  @ApiProperty({ example: 'StrongPassword123', minLength: 8, maxLength: 128 })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(128)
  password!: string;

  @ApiPropertyOptional({ example: '1994-01-01' })
  @IsOptional()
  @IsDateString()
  birthday?: string;

  @ApiPropertyOptional({
    example: UserStatusEnum.PENDING_EMAIL_VERIFICATION,
    enum: UserStatusEnum,
  })
  @IsOptional()
  @IsEnum(UserStatusEnum)
  status?: UserStatusEnum;

  @ApiPropertyOptional({
    example: ProductRoleEnum.CANDIDATE,
    enum: ProductRoleEnum,
  })
  @IsOptional()
  @IsEnum(ProductRoleEnum)
  productRole?: ProductRoleEnum;

  @ApiPropertyOptional({ type: CandidateProfileInputDto })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => CandidateProfileInputDto)
  candidateProfile?: CandidateProfileInputDto;

  @ApiPropertyOptional({ type: RecruiterProfileInputDto })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => RecruiterProfileInputDto)
  recruiterProfile?: RecruiterProfileInputDto;
}

export class CreateInternalUserDto extends CreateUserDto {
  @ApiPropertyOptional({ enum: AdminRoleEnum })
  @IsOptional()
  @IsEnum(AdminRoleEnum)
  adminRole?: AdminRoleEnum;

  @ApiPropertyOptional({ type: [String], enum: PermissionEnum })
  @IsOptional()
  @IsArray()
  @IsEnum(PermissionEnum, { each: true })
  permissions?: PermissionEnum[];

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isInternal?: boolean;
}

export {
  AvailabilityInputDto,
  CandidateProfileInputDto,
  CertificationInputDto,
  ContactsInputDto,
  CreateUserDto as CreateUserDTO,
  DemographicsInputDto,
  DocumentsInputDto,
  EducationInputDto,
  LocationPreferencesInputDto,
  PhysicalProfileInputDto,
  ProfessionalMediaInputDto,
  ProfessionalProfileInputDto,
  RecruiterProfileInputDto,
  SocialInputDto,
  UniformSizesInputDto,
};
