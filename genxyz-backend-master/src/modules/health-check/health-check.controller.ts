import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('health-check')
export class HealthCheckController {
    @Get("/ping")
    async login(@Res() Res: Response) {
        Res.status(HttpStatus.OK).send("Service is up");
    }
}
