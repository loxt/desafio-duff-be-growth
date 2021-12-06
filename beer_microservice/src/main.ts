import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcExceptionFilter } from './common/filters/rpc-exception.filter';

async function bootstrap() {
  const logger: Logger = new Logger('Microservice');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.MICROSERVICE_HOST,
        port: +process.env.MICROSERVICE_PORT,
      },
    },
  );
  app.useGlobalFilters(new RpcExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  app.listen().then(() => {
    logger.log('Listening on port 8081');
  });
}

bootstrap();
