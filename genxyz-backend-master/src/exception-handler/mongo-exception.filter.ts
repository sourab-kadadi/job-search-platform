import { ArgumentsHost, Catch, ConflictException, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { MongoError } from 'mongodb';
const mongoErrors = require('mongo-error-handler');
@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    switch (exception.code) {
      case 11000:
        response.status(409).json({ statusCode: 409,  message: "Alrerady Exist", timestamp: new Date().toISOString(), error:  mongoErrors(exception) });
    default:
        response.status(500).json({ statusCode: 500, message: "Please Contact GenXYZ.work", timestamp: new Date().toISOString(), error:  JSON.stringify(exception) });
    }
  }
}