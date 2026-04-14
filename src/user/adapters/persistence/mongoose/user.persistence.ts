import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  AdminPermissionEnum,
  AdminRoleEnum,
  ProductPermissionEnum,
  ProductRoleEnum,
  UserStatusEnum,
} from '@src/user/domains/entities/user.entity';
import { HydratedDocument } from 'mongoose';

export type UserPersistenceDocument = HydratedDocument<UserPersistenceModel>;

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserPersistenceModel {
  @Prop({ required: true, trim: true, unique: true })
  email!: string;

  @Prop({ required: true, trim: true })
  password!: string;

  @Prop({ required: true, trim: true })
  firstName!: string;

  @Prop({ required: true, trim: true })
  lastName!: string;

  @Prop({ required: true })
  birthday!: string;

  @Prop({
    required: true,
    enum: UserStatusEnum,
    type: String,
    default: 'pending_account_confirmation',
  })
  status!: string;

  @Prop({
    required: false,
    enum: ProductRoleEnum,
    type: String,
  })
  productRole?: ProductRoleEnum;

  @Prop({
    required: false,
    enum: AdminRoleEnum,
    type: String,
  })
  adminRole?: AdminRoleEnum;

  @Prop({
    required: false,
    type: [String],
    enum: ProductPermissionEnum,
    default: undefined,
  })
  productPermissions?: ProductPermissionEnum[];

  @Prop({
    required: false,
    type: [String],
    enum: AdminPermissionEnum,
    default: undefined,
  })
  adminPermissions?: AdminPermissionEnum[];

  @Prop({
    required: false,
    type: [String],
    enum: AdminPermissionEnum,
    default: undefined,
  })
  permissions?: AdminPermissionEnum[];
  @Prop({ required: false, default: false })
  isInternal?: boolean;

  @Prop({
    required: false,
    type: Object,
    default: undefined,
  })
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

  @Prop({
    required: false,
    type: Object,
    default: undefined,
  })
  recruiterProfile?: {
    companyName?: string;
    companyDocument?: string;
    position?: string;
    phone?: string;
    website?: string;
  };

  @Prop({ required: false })
  emailVerifiedAt?: string;

  @Prop({ required: false })
  createdBy?: string;

  @Prop({ required: false })
  lastLoginAt?: string;

  @Prop({ required: false })
  suspendedAt?: string;

  @Prop({ required: false })
  suspendedReason?: string;

  @Prop({ required: false })
  deactivatedAt?: string;

  @Prop({ required: false })
  deactivatedReason?: string;

  @Prop({ required: false })
  bannedAt?: string;

  @Prop({ required: false })
  bannedReason?: string;

  @Prop({ required: false })
  passwordResetTokenHash?: string;

  @Prop({ required: false })
  passwordResetExpiresAt?: Date;

  @Prop({ required: false })
  emailVerificationTokenHash?: string;

  @Prop({ required: false })
  emailVerificationExpiresAt?: Date;

  @Prop({ required: true, default: 0, min: 0 })
  tokenVersion!: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export const UserPersistenceSchema =
  SchemaFactory.createForClass(UserPersistenceModel);
