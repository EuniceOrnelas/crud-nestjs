import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * Controlador principal de la aplicación.
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Endpoint para obtener un saludo "Hello World!".
   * @returns Una cadena que contiene el saludo.
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
