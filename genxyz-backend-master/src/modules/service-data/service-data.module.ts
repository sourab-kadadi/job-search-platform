import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceDataController } from './service-data.controller';
import { ServiceData } from './service-data.schema';
import { ServiceDataService } from './service-data.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'ServiceData', schema: ServiceData }])],
  controllers: [ServiceDataController, ],
  providers: [ServiceDataService]
})
export class ServiceDataModule {}
