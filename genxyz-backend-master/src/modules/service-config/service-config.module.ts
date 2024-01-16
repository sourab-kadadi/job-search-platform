import { Module } from '@nestjs/common';
import { ServiceConfigController } from './service-config.controller';
import { ServiceConfigService } from './service-config.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [ServiceConfigController ],
  providers: [ServiceConfigService]
})
export class ServiceConfigModule {}
