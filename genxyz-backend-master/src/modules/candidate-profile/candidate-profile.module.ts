import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { CandidateProfileController } from './candidate-profile.controller';
import { candidateProfile } from './candidate-profile.schema';
import { CandidateProfileService } from './candidate-profile.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'CandidateProfiles', schema: candidateProfile }])],
  controllers: [CandidateProfileController],
  providers: [CandidateProfileService]
})
export class CandidateProfileModule {}
