import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Función principal de inicio de la aplicación.
 */
async function bootstrap() {
  // Crea una instancia de la aplicación NestJS.
  const app = await NestFactory.create(AppModule);

  // Aplica un tubo global de validación para validar las solicitudes entrantes.
  app.useGlobalPipes(new ValidationPipe());

  // Inicia la aplicación en el puerto 3000.
  await app.listen(3000);
}

// Inicia la aplicación llamando a la función bootstrap().
bootstrap();
