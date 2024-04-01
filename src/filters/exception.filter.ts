import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { LoggingService } from '../logging/logging.service';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  constructor(private loggingService: LoggingService) {}
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : StatusCodes.INTERNAL_SERVER_ERROR;

    this.loggingService.error(exception.message, exception);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
