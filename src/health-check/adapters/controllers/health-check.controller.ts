import { Controller, Get } from '@nestjs/common';
import { HealthCheckUseCase } from '@src/health-check/applications/use-cases/health-check.use-case';
import type { HealthCheckResponse } from '@src/health-check/applications/contracts/health-check-response.interface';

@Controller('health-check')
export class HealthCheckController {
  constructor(private readonly healthCheckUseCase: HealthCheckUseCase) {}

  @Get()
  get(): HealthCheckResponse {
    return this.healthCheckUseCase.execute();
  }
}
