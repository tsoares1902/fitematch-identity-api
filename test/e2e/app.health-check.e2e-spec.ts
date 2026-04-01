import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types';
import { AppModule } from '../../src/app.module';

describe('HealthCheckController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/health-check (GET)', () => {
    return request(app.getHttpServer() as App)
      .get('/health-check')
      .expect(200)
      .expect({
        healthy: true,
        name: 'API',
        version: '0.0.1',
      });
  });
});
