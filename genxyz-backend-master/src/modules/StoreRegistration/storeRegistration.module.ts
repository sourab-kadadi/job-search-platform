import { Module } from '@nestjs/common';
import { StoreRegistationController } from './storeRegistration.controller';
import { StoreRegistrationService } from './storeRegistration.service';
import { MongooseModule } from '@nestjs/mongoose';
import { store } from './storeRegistration.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'StoresRegistration', schema: store }])],
  controllers: [StoreRegistationController],
  providers: [StoreRegistrationService]
})
export class StoreRegistrationModule {}
