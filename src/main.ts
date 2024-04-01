import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { config } from 'dotenv';
import { LoggingService } from './logging/logging.service';
config();

const port = process.env.PORT || 7000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logging = app.get(LoggingService);
  process.on('uncaughtException', (e) => {
    logging.error('uncaughtException', e);
  });
  process.on('unhandledRejection', (reason) => {
    logging.error('unhandledRejection', new Error(reason as string));
  });
  await app.listen(port);
}
bootstrap();
