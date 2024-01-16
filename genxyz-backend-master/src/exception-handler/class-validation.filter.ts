import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    InternalServerErrorException,
  } from '@nestjs/common';
import { ValidationException } from './validation.exception';

  @Catch(ValidationException)
  export class ClassValidationFilter implements ExceptionFilter {
    catch(exception: ValidationException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const status = HttpStatus.BAD_REQUEST;
      response.status(status).json({
        statusCode: status,
        message: exception.validationErrors[0],
        timestamp: new Date().toISOString(),
        error: JSON.stringify(exception) as any,
      });
    }
  }