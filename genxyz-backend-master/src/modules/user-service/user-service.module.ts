import { Module } from '@nestjs/common';
import { UserServiceController } from './user-service.controller';
import { UserServiceService } from './user-service.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user-service.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'UserService', schema: UserService }])],
  controllers: [UserServiceController],
  providers: [UserServiceService]
})
export class UserServiceModule {}
