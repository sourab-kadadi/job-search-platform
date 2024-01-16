import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {user} from './user.schema'
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '../Auth/local.strategy';
import { JwtStrategy } from '../Auth/jwt.strategy';
import { RedisModule } from '../redis/redis.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalClientStrategy } from '../Auth/local-client.strategy'
@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: user }]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: await configService.get<string>("jwtSecrate.access_token_secrate"),
        signOptions: { expiresIn: '60000s' },
      }),
      inject: [ConfigService]
    }),
    RedisModule
  ],
    controllers: [ UserController],
    providers: [UserService, LocalStrategy, JwtStrategy, LocalClientStrategy],
    exports: [UserService]
  })
  export class CatsModule {
  }