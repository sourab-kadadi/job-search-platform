import { Module } from '@nestjs/common';
import { GiverDetailsService } from './giver-details.service';
import { GiverDetailsController } from './giver-details.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { giverDetails } from './giver-details.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'GiverDetails', schema: giverDetails }])],
  providers: [GiverDetailsService],
  controllers: [GiverDetailsController]
})
export class GiverDetailsModule {}
