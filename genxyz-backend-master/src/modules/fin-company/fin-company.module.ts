import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FinCompanyController } from './fin-company.controller';
import { FinCompanyService } from './fin-company.service';
import { finCompanyDetails } from './fin-company.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'FinCompany', schema: finCompanyDetails }])],
  providers: [FinCompanyService],
  controllers: [FinCompanyController]
})

export class FinCompanyModule {}
