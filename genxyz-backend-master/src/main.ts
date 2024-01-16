import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { ClassValidationFilter } from './exception-handler/class-validation.filter';
import { ValidationException } from './exception-handler/validation.exception';
import { HttpExceptionFilter } from './exception-handler/http-exception.filter';
import { AllExceptionsFilter } from './exception-handler/exception.filter';
import { MongoExceptionFilter } from './exception-handler/mongo-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: console,});
  app.setGlobalPrefix('api');
  const configService = app.get(ConfigService);
  app.useGlobalFilters(
    new AllExceptionsFilter(),
    new HttpExceptionFilter(),
    new MongoExceptionFilter(),
    new ClassValidationFilter()
  )
  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted : true,
    exceptionFactory: (errors: ValidationError[]) => {
      const messages = errors.map(error => `${Object.values(error.constraints).join(',')}`);
      return new ValidationException(messages);
    }}));
  const options = new DocumentBuilder()
  .setTitle('Stores Service')
  .setDescription('Store')
  .setVersion('1.0')
  .addTag('Registration')
  .build();
  if (process.env.NODE_ENV !== 'production') {
const document = SwaggerModule.createDocument(app, options);
  fs.writeFileSync("./swagger-spec.json", JSON.stringify(document));
  SwaggerModule.setup('api', app, document);
  }
  app.enableCors();
  let port = configService.get('port');
  console.log(port);
  await app.listen(port);
}
bootstrap();
