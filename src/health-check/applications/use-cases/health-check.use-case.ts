import { Injectable } from '@nestjs/common';
import type { HealthCheckResponse } from '../contracts/health-check-response.interface';

@Injectable()
export class HealthCheckUseCase {
  execute(): HealthCheckResponse {
    return {
      healthy: true,
      name: 'API',
      version: process.env.npm_package_version ?? '0.0.1',
    };
  }
}
