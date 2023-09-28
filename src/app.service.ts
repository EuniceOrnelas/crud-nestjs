import { Injectable } from '@nestjs/common';

/**
 * Servicio principal de la aplicación.
 */
@Injectable()
export class AppService {
  /**
   * Obtiene un saludo "Hello World!".
   * @returns Una cadena que contiene el saludo.
   */
  getHello(): string {
    return 'Hello World!';
  }
}
