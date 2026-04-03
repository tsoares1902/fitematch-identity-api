import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ListSessionsController } from '@src/auth/adapters/controllers/list-sessions.controller';
import { LoginController } from '@src/auth/adapters/controllers/login.controller';
import { LogoutController } from '@src/auth/adapters/controllers/logout.controller';
import { authProviders } from '@src/auth/auth.providers';
import {
  SessionEntity,
  SessionSchema,
} from '@src/auth/domains/schemas/session.schema';
import { UserEntity, UserSchema } from '@src/user/domains/schemas/user.schema';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'dev-secret-change-me',
      signOptions: {
        expiresIn: '1d',
      },
    }),
    MongooseModule.forFeature([
      {
        name: UserEntity.name,
        schema: UserSchema,
      },
      {
        name: SessionEntity.name,
        schema: SessionSchema,
      },
    ]),
  ],
  controllers: [LoginController, LogoutController, ListSessionsController],
  providers: [...authProviders],
  exports: [...authProviders],
})
export class AuthModule {}
