import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from '@src/health-check/adapters/controllers/health-check.controller';
import { HealthCheckUseCase } from '@src/health-check/applications/use-cases/health-check.use-case';

describe('HealthCheckController', () => {
  let controller: HealthCheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [HealthCheckUseCase],
    }).compile();

    controller = module.get<HealthCheckController>(HealthCheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be "API"', () => {
    const expected = {
      healthy: true,
      name: 'API',
      version: process.env.npm_package_version ?? '0.0.1',
    };
    expect(controller.get()).toBeDefined();
    expect(controller.get()).toMatchObject(expected);
  });
});
