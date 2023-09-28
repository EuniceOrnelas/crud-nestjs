import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

/**
 * Pruebas end-to-end para el controlador AppController.
 */
describe('AppController (e2e)', () => {
  let app: INestApplication;

  /**
   * Antes de cada prueba, se crea una aplicación NestJS y se inicializa.
   */
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  /**
   * Prueba de solicitud GET en la ruta raíz ("/").
   */
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200) // Se espera una respuesta HTTP 200.
      .expect('Hello World!'); // Se espera que el cuerpo de la respuesta sea "Hello World!".
  });
});
