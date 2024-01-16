import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { MongooseModule } from '@nestjs/mongoose';
import { store } from './store.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Stores', schema: store }])],
  controllers: [StoreController],
  providers: [StoreService]
})
export class StoreModule {}
