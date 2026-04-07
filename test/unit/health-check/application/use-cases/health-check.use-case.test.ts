import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckUseCase } from '@src/health-check/applications/use-cases/health-check.use-case';

describe('HealthCheckUseCase', () => {
  let useCase: HealthCheckUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthCheckUseCase],
    }).compile();

    useCase = module.get<HealthCheckUseCase>(HealthCheckUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return API health-check data', () => {
    const expected = {
      healthy: true,
      name: 'API',
      version: process.env.npm_package_version ?? '0.0.1',
    };

    expect(useCase.execute()).toBeDefined();
    expect(useCase.execute()).toMatchObject(expected);
  });
});
