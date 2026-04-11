import { HealthCheckController } from '@src/health-check/adapters/controllers/health-check.controller';

describe('HealthCheckController', () => {
  it('delegates to the health check use case', () => {
    const healthCheckUseCase = {
      execute: jest.fn().mockReturnValue({
        healthy: true,
        name: 'API',
        version: '1.0.0',
      }),
    };
    const controller = new HealthCheckController(healthCheckUseCase as never);

    expect(controller.get()).toEqual({
      healthy: true,
      name: 'API',
      version: '1.0.0',
    });
    expect(healthCheckUseCase.execute.mock.calls).toHaveLength(1);
  });
});
