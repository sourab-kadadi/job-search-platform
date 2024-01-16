import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { order } from './order.schema'
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Orders', schema: order }])],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
