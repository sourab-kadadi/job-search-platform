import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    let x = 10;
    return 'Hello World!';
  }
}
