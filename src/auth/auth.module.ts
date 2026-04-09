import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ListSessionsController } from '@src/auth/adapters/controllers/list-sessions.controller';
import { ForgotPasswordController } from '@src/auth/adapters/controllers/forgot-password.controller';
import { LoginController } from '@src/auth/adapters/controllers/login.controller';
import { LogoutController } from '@src/auth/adapters/controllers/logout.controller';
import { ResendVerificationEmailController } from '@src/auth/adapters/controllers/resend-verification-email.controller';
import { ResetPasswordController } from '@src/auth/adapters/controllers/reset-password.controller';
import { VerifyEmailController } from '@src/auth/adapters/controllers/verify-email.controller';
import { authProviders } from '@src/auth/auth.providers';
import {
  SessionEntity,
  SessionSchema,
} from '@src/auth/domains/schemas/session.schema';
import {
  UserPersistenceModel,
  UserPersistenceSchema,
} from '@src/user/adapters/persistence/mongoose/user.persistence';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'dev-secret-change-me',
      signOptions: {
        expiresIn: '1d',
      },
    }),
    MongooseModule.forFeature([
      {
        name: UserPersistenceModel.name,
        schema: UserPersistenceSchema,
      },
      {
        name: SessionEntity.name,
        schema: SessionSchema,
      },
    ]),
  ],
  controllers: [
    LoginController,
    LogoutController,
    ListSessionsController,
    ForgotPasswordController,
    ResetPasswordController,
    VerifyEmailController,
    ResendVerificationEmailController,
  ],
  providers: [...authProviders],
  exports: [...authProviders],
})
export class AuthModule {}
