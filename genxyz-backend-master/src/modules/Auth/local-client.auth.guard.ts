import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalClientAuthGuard extends AuthGuard('local-client') {}