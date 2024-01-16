import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileController } from './profile.controller';
import { Profile } from './profile.schema';
import { ProfileService } from './profile.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Profile', schema: Profile }])],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
