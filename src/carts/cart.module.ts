

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartResolver } from './resolvers/cart.resolver';
import { CartService } from './services/cart.service';

@Module({
  imports:[TypeOrmModule.forFeature([Cart])],
  providers: [CartResolver, CartService]
})
export class CartModule {}
