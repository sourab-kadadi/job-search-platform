import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AwsController } from './aws.controller';
import { AwsService } from './aws.service';

@Module({
  controllers: [AwsController],
  providers: [AwsService, ConfigService]
})
export class AwsModule {}
