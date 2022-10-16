

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discount } from './entities/discount.entity';
import { DiscountResolver } from './resolvers/discount.resolver';
import { DiscountService } from './services/discount.service';

@Module({
  imports:[TypeOrmModule.forFeature([Discount])],
  providers: [DiscountResolver, DiscountService]
})
export class DiscountModule {}
