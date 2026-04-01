import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@src/user/user.module';
import apiConfig from '@src/config/api.config';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthCheckModule } from './health-check/health-check.module';

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
    UserModule,
    HealthCheckModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
