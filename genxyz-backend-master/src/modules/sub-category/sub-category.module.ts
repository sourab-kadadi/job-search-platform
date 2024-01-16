import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategoryController } from './sub-category.controller';
import { subCategory } from './sub-category.schema';
import { SubCategoryService } from './sub-category.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'sub-category', schema: subCategory }])],
  controllers: [SubCategoryController],
  providers: [SubCategoryService]
})
export class SubCategoryModule {}
