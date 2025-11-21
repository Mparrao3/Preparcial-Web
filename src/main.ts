import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar validación global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Elimina propiedades no decoradas en los DTOs
    forbidNonWhitelisted: true, // Lanza error si llegan propiedades extra
    transform: true, // Transforma los payloads a instancias de DTO
  }));

  // Habilitar CORS por si se quiere probar desde un frontend simple
  app.enableCors();

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
