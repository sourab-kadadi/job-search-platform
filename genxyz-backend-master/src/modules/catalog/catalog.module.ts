import { Module } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { catalog } from './catalog.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Catalog', schema: catalog }])],
  providers: [CatalogService],
  controllers: [CatalogController]
})
export class CatalogModule {}
