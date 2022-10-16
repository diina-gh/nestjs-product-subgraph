

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoryResolver } from './resolvers/category.resolver';
import { CategoryService } from './services/category.service';

@Module({
  imports:[TypeOrmModule.forFeature([Category])],
  providers: [CategoryResolver, CategoryService]
})
export class CategoryModule {}
