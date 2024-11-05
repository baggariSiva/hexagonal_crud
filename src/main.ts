import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
const logger = new Logger();

async function bootstrap() {
  const app = (
    await NestFactory.create(AppModule, { cors: true })
  ).setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen(3000, () => {
    logger.log('Server running at port: ' + 3000);
  });
}
bootstrap();
