import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { CompaniesModule } from './../../src/companies/companies.module';
import { Company } from 'src/companies/companies.entity';

describe('CompaniesController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<Company>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: __dirname + '/../../data/sws-data.sqlite3',
          synchronize: false,
          logging: false,
          entities: [__dirname + '/../../src/**/*.entity.{js,ts}'],
          namingStrategy: new SnakeNamingStrategy()
        }),
        CompaniesModule
      ],
    }).compile();

    repository = moduleFixture.get('CompanyRepository');

    app = moduleFixture.createNestApplication();
    await app.init();

    // to check available routes.
    // const router = app.getHttpServer()._events.request._router;
    // const availableRoutes: [] = router.stack
    // .map(layer => {
    //   if (layer.route) {
    //     return {
    //       route: {
    //         path: layer.route?.path,
    //         method: layer.route?.stack[0].method,
    //       },
    //     };
    //   }
    // })
    // .filter(item => item !== undefined);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/companies with default pagination (GET)', () => {
    return request(app.getHttpServer())
      .get('/companies')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('totalCount');
        expect(res.body).toHaveProperty('data');
        expect(res.body.totalCount).toBe(12);
        expect(res.body.data).toHaveLength(10);
      });
  });

  it('/companies with pagination (GET)', () => {
    return request(app.getHttpServer())
      .get('/companies?take=5')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('totalCount');
        expect(res.body).toHaveProperty('data');
        expect(res.body.totalCount).toBe(12);
        expect(res.body.data).toHaveLength(5);
      });
  });

  it('/companies with share prices (GET)', () => {
    return request(app.getHttpServer())
      .get('/companies?take=1&includeShares=true')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('totalCount');
        expect(res.body).toHaveProperty('data');
        expect(res.body.totalCount).toBe(12);
        expect(res.body.data).toHaveLength(1);
        expect(res.body.data[0]).toHaveProperty('shares');
      });
  });

  it('/companies filter by overall score (GET)', () => {
    return request(app.getHttpServer())
      .get('/companies?score=9')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('totalCount');
        expect(res.body).toHaveProperty('data');
        expect(res.body.totalCount).toBe(12);
        expect(res.body.data).toHaveLength(2);
        expect(res.body.data[0].score.total).toBe(9);
        expect(res.body.data[1].score.total).toBe(9);
      });
  });

  it('/companies filter by exchange symbols score (GET)', () => {
    return request(app.getHttpServer())
      .get('/companies?symbol=ASX')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('totalCount');
        expect(res.body).toHaveProperty('data');
        expect(res.body.totalCount).toBe(12);
        expect(res.body.data).toHaveLength(3);
        expect(res.body.data[0].exchangeSymbol).toBe('ASX');
        expect(res.body.data[1].exchangeSymbol).toBe('ASX');
        expect(res.body.data[2].exchangeSymbol).toBe('ASX');
      });
  });

  it('/companies/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/companies/46B285BC-B25F-4814-985C-390A4BFA2023')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('score');
        expect(res.body).toHaveProperty('shares');
        expect(res.body.id).toBe('46B285BC-B25F-4814-985C-390A4BFA2023');
      });
  });
});
