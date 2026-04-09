import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import {
  AdminRoleEnum,
  PermissionEnum,
  ProductRoleEnum,
  UserStatusEnum,
} from '@src/user/domains/entities/user.entity';
import {
  CandidateProfileInputDto,
  RecruiterProfileInputDto,
} from './create-user.dto';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'John', maxLength: 255 })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  firstName?: string;

  @ApiPropertyOptional({ example: 'Doe', maxLength: 255 })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  lastName?: string;

  @ApiPropertyOptional({ example: 'john@example.com', maxLength: 255 })
  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;

  @ApiPropertyOptional({ example: '1994-01-01' })
  @IsOptional()
  @IsDateString()
  birthday?: string;

  @ApiPropertyOptional({ example: UserStatusEnum.ACTIVE, enum: UserStatusEnum })
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

  @ApiPropertyOptional({ example: AdminRoleEnum.ADMIN, enum: AdminRoleEnum })
  @IsOptional()
  @IsEnum(AdminRoleEnum)
  adminRole?: AdminRoleEnum;

  @ApiPropertyOptional({ type: [String], enum: PermissionEnum })
  @IsOptional()
  @IsArray()
  @IsEnum(PermissionEnum, { each: true })
  permissions?: PermissionEnum[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isInternal?: boolean;

  @ApiPropertyOptional({ type: CandidateProfileInputDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CandidateProfileInputDto)
  candidateProfile?: CandidateProfileInputDto;

  @ApiPropertyOptional({ type: RecruiterProfileInputDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => RecruiterProfileInputDto)
  recruiterProfile?: RecruiterProfileInputDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  emailVerifiedAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  createdBy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lastLoginAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  suspendedAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  suspendedReason?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  deactivatedAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  deactivatedReason?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bannedAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bannedReason?: string;
}

export class UpdateMyProfileDto {
  @ApiPropertyOptional({ example: 'John', maxLength: 255 })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  firstName?: string;

  @ApiPropertyOptional({ example: 'Doe', maxLength: 255 })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  lastName?: string;

  @ApiPropertyOptional({ example: '1994-01-01' })
  @IsOptional()
  @IsDateString()
  birthday?: string;

  @ApiPropertyOptional({ type: CandidateProfileInputDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CandidateProfileInputDto)
  candidateProfile?: CandidateProfileInputDto;

  @ApiPropertyOptional({ type: RecruiterProfileInputDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => RecruiterProfileInputDto)
  recruiterProfile?: RecruiterProfileInputDto;
}
