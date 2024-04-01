import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggingService {
  constructor() {}

  log(message: string) {
    console.log(`[INFO] ${message}`);
  }

  error(message: string, error: Error) {
    console.error(`[ERROR] ${message}`, error);
  }
}
