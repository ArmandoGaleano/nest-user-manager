import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '@/infrastructure/http/modules/router/app.module';
import TestAgent from 'supertest/lib/agent';

describe('UsersController (e2e) - PRIVATE', () => {
  let app: INestApplication<App>;
  let TestAgent: TestAgent;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    TestAgent = request(app.getHttpServer());

    await app.init();
  });

  it('/api/private/v1/users (POST)', () => {
    return TestAgent.post('/api/private/v1/users')
      .send({
        email: 'mrrobot@email.com',
        password: 'UmaSenh@a2wi2gnp2',
        firstName: 'Mr',
        lastName: 'Robot',
        birthdate: '2000-12-15',
        document: '447.569.738-76',
        documentType: 'CPF',
        roles: ['admin'],
      })
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
