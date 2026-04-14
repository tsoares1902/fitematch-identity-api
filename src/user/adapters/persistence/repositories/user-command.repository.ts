import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { toPersistenceWriteModel } from '@src/user/adapters/persistence/repositories/user-persistence.helpers';
import {
  type UserPersistenceDocument,
  UserPersistenceModel,
} from '@src/user/adapters/persistence/mongoose/user.persistence';
import type {
  CandidateProfileInterface,
  RecruiterProfileInterface,
  UserInterface,
} from '@src/user/applications/contracts/user.interface';
import type { CreateUserRepositoryInterface } from '@src/user/applications/contracts/create-user.repository-interface';
import type { DeleteUserRepositoryInterface } from '@src/user/applications/contracts/delete-user.repository-interface';
import type { UpdateUserRepositoryInterface } from '@src/user/applications/contracts/update-user.repository-interface';
import type { UpdateUserDataUseCaseInterface } from '@src/user/applications/contracts/update-user.use-case-interface';
import type { UserRecord } from '@src/user/applications/contracts/user-record.interface';
import { toDomainUser } from '@src/user/adapters/persistence/mappers/user-persistence.mapper';
import type {
  CreateUserCommand,
  UserCommandRepository,
  UpdateUserCommand,
} from '@src/user/domains/repositories/user-command.repository';
import { Model } from 'mongoose';

@Injectable()
export class UserCommandRepositoryAdapter
  implements
    CreateUserRepositoryInterface,
    UpdateUserRepositoryInterface,
    DeleteUserRepositoryInterface,
    UserCommandRepository
{
  constructor(
    @InjectModel(UserPersistenceModel.name)
    private readonly userModel: Model<UserPersistenceDocument>,
  ) {}

  async createUser(
    data: import('@src/user/applications/contracts/create-user.use-case-interface').CreateUserDataUseCaseInterface,
  ): Promise<
    import('@src/user/applications/contracts/user-record.interface').UserRecord
  > {
    const user = await this.userModel.create(this.toPersistencePayload(data));
    return toDomainUser(user);
  }

  async update(
    id: string,
    data: UpdateUserDataUseCaseInterface,
  ): Promise<UserRecord | null>;
  async update(
    id: string,
    command: UpdateUserCommand,
  ): Promise<UserRecord | null>;
  async update(
    id: string,
    dataOrCommand: UpdateUserDataUseCaseInterface | UpdateUserCommand,
  ): Promise<UserRecord | null> {
    const payload = this.toPersistencePayload(
      'user' in dataOrCommand ? dataOrCommand.user : dataOrCommand,
    );
    const user = await this.userModel
      .findByIdAndUpdate(id, payload, {
        returnDocument: 'after',
        runValidators: true,
      })
      .exec();

    if (!user) {
      return null;
    }

    return toDomainUser(user);
  }

  async create(command: CreateUserCommand): Promise<UserRecord> {
    const user = await this.userModel.create(
      this.toPersistencePayload(command.user, {
        password: command.passwordHash,
        tokenVersion: command.tokenVersion ?? 0,
      }),
    );
    return toDomainUser(user);
  }

  async delete(id: string): Promise<boolean> {
    return this.deactivate(id);
  }

  async deactivate(id: string): Promise<boolean> {
    const user = await this.userModel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            status: 'deactivated',
            deactivatedAt: new Date().toISOString(),
          },
        },
        { returnDocument: 'after' },
      )
      .exec();

    return Boolean(user);
  }

  private toPersistencePayload(
    data: Partial<UserInterface>,
    extra: {
      password?: string;
      tokenVersion?: number;
    } = {},
  ): Record<string, unknown> {
    const payload = toPersistenceWriteModel({
      ...data,
      ...extra,
      candidateProfile: this.toPersistenceCandidateProfile(
        data.candidateProfile,
      ),
      recruiterProfile: this.toPersistenceRecruiterProfile(
        data.recruiterProfile,
      ),
    });

    if (data.accountVerifiedAt !== undefined) {
      payload.emailVerifiedAt = data.accountVerifiedAt;
    }

    delete payload.accountVerifiedAt;
    return payload;
  }

  private toPersistenceCandidateProfile(
    profile?: CandidateProfileInterface,
  ): Record<string, unknown> | undefined {
    if (!profile) {
      return undefined;
    }

    const candidateProfile: Record<string, unknown> = {
      documents: profile.documents,
      contacts:
        profile.phone || profile.address
          ? {
              ...profile.phone,
              ...profile.address,
            }
          : undefined,
      social: profile.social,
      demographics:
        profile.ethnicity || profile.diversity
          ? {
              ...profile.ethnicity,
              ...profile.diversity,
            }
          : undefined,
      physicalProfile: profile.physicalProfile,
      uniformSizes: profile.uniformSizes,
      professionalProfile: profile.professionalProfile,
      educations: profile.educations,
      availability: profile.availability,
      locationPreferences: profile.locationPreferences,
      professionalMedia: profile.professionalMedia,
    };

    Object.keys(candidateProfile).forEach(
      (key) =>
        candidateProfile[key] === undefined && delete candidateProfile[key],
    );

    return Object.keys(candidateProfile).length > 0
      ? candidateProfile
      : undefined;
  }

  private toPersistenceRecruiterProfile(
    profile?: RecruiterProfileInterface,
  ): Record<string, unknown> | undefined {
    if (!profile) {
      return undefined;
    }

    const recruiterProfile: Record<string, unknown> = {
      position: profile.position,
      companyDocument: profile.documents?.socialDocumentNumber,
      phone: profile.phone?.phone,
    };

    Object.keys(recruiterProfile).forEach(
      (key) =>
        recruiterProfile[key] === undefined && delete recruiterProfile[key],
    );

    return Object.keys(recruiterProfile).length > 0
      ? recruiterProfile
      : undefined;
  }
}
