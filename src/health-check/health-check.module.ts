import { Module } from '@nestjs/common';
import { HealthCheckController } from '@src/health-check/adapters/controllers/health-check.controller';
import { healthCheckProviders } from '@src/health-check/health-check.providers';

@Module({
  controllers: [HealthCheckController],
  providers: [...healthCheckProviders],
})
export class HealthCheckModule {}
