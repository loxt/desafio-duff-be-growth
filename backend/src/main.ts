import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger: Logger = new Logger('Duff Server');
  const app = await NestFactory.create(AppModule);
  app.listen(8080).then(() => logger.log('Server has initialized!'));
}
bootstrap();
