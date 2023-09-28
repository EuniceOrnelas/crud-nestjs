import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

/**
 * Pruebas unitarias para el controlador AppController.
 */
describe('AppController', () => {
  let appController: AppController;

  /**
   * Antes de cada prueba, se crea un módulo de prueba y se obtiene una instancia del controlador.
   */
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  /**
   * Bloque describe para pruebas del método "getHello".
   */
  describe('root', () => {
    /**
     * Prueba para verificar que el método "getHello" devuelve "Hello World!".
     */
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
