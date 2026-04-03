import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SessionDocument = HydratedDocument<SessionEntity>;

@Schema({ _id: false })
export class UserAgentEntity {
  @Prop()
  browser?: string;

  @Prop()
  deviceType?: string;

  @Prop()
  ip?: string;

  @Prop()
  os?: string;

  @Prop()
  timezone?: string;

  @Prop()
  userAgent?: string;
}

const UserAgentSchema = SchemaFactory.createForClass(UserAgentEntity);

@Schema({
  collection: 'sessions',
  timestamps: false,
})
export class SessionEntity {
  @Prop({ required: true, index: true })
  userId!: string;

  @Prop({ required: true, unique: true, index: true })
  sessionId!: string;

  @Prop({ type: UserAgentSchema, required: false })
  client?: UserAgentEntity;

  @Prop({ required: true, default: true })
  active!: boolean;

  @Prop({ required: true })
  createdAt!: Date;

  @Prop({ required: true })
  startedAt!: Date;

  @Prop()
  endedAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const SessionSchema = SchemaFactory.createForClass(SessionEntity);
