import { HttpStatus, HttpException } from '@nestjs/common';


export class InternalServerException extends HttpException {
    constructor() {
      super('Forbidden', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }