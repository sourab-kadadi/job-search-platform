import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobApplyController } from './job-apply.controller';
import { JobApplyService } from './job-apply.service';
import { jobApply } from './job-apply.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'JobApply', schema: jobApply }])],
  controllers: [JobApplyController],
  providers: [JobApplyService]
})
export class JobApplyModule {}
