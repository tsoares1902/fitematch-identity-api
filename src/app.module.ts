import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import apiConfig from '@src/config/api.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthCheckModule } from '@src/health-check/health-check.module';
import { UserModule } from '@src/user/user.module';
import { AuthModule } from '@src/auth/auth.module';

const importedModules = [HealthCheckModule, UserModule, AuthModule];
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [apiConfig],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URI'),
        dbName: configService.get<string>('DATABASE_NAME'),
      }),
    }),
    ...importedModules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
