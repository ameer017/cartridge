import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Enable CORS (optional, adjust as needed)
  app.enableCors();

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Server running on port ${port}`);
}

bootstrap();

