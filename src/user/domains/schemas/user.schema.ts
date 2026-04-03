import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserStatusEnum } from '@src/user/applications/contracts/user-status.enum';
import { UserRoleEnum } from '@src/user/applications/contracts/user-role.enum';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserEntity>;

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserEntity {
  @Prop({
    required: true,
    enum: UserRoleEnum,
    type: String,
    default: UserRoleEnum.CANDIDATE,
  })
  role!: UserRoleEnum;

  @Prop({ required: true, trim: true, unique: true })
  username!: string;

  @Prop({ required: true, trim: true })
  firstName!: string;

  @Prop({ required: true, trim: true })
  lastName!: string;

  @Prop({ required: true, trim: true, unique: true })
  email!: string;

  @Prop({ required: true, trim: true })
  password!: string;

  @Prop({ required: true, default: 0, min: 0 })
  tokenVersion!: number;

  @Prop({ required: true })
  birthday!: string;

  @Prop({
    required: true,
    enum: UserStatusEnum,
    type: String,
    default: UserStatusEnum.PENDING,
  })
  status!: UserStatusEnum;

  createdAt?: Date;
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
