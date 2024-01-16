import { Module } from '@nestjs/common';
import { GiverPostController } from './giver-post.controller';
import { GiverPostService } from './giver-post.service';

@Module({
  controllers: [GiverPostController],
  providers: [GiverPostService]
})
export class GiverPostModule {}
