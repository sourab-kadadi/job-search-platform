import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { category } from './category.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Categorys', schema: category }])],
  controllers:
   [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
