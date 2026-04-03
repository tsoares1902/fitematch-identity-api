import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import apiConfig from '@src/config/api.config';
import { ConfigModule } from '@nestjs/config';
import { HealthCheckModule } from '@src/health-check/health-check.module';
import { UserModule } from '@src/user/user.module';
import { AuthModule } from '@src/auth/auth.module';

const importedModules = [HealthCheckModule, UserModule, AuthModule];

const databaseUri = process.env.DATABASE_URI;
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [apiConfig],
      isGlobal: true,
    }),
    ...(databaseUri
      ? [
          MongooseModule.forRoot(databaseUri, {
            dbName: process.env.DATABASE_NAME,
          }),
        ]
      : []),
    ...importedModules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
