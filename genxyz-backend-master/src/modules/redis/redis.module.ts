import { RedisController } from './redis.controller';
import { RedisService } from './redis.service';
import { Module } from '@nestjs/common';
@Module({
  controllers: [RedisController],
  providers: [RedisService],
  exports: [RedisService]
})
export class RedisModule {}
