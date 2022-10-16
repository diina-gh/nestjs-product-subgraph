

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entities/cart-item.entity';
import { CartItemResolver } from './resolvers/cart-item.resolver';
import { CartItemService } from './services/cart-item.service';

@Module({
  imports:[TypeOrmModule.forFeature([CartItem])],
  providers: [CartItemResolver, CartItemService]
})
export class CartItemModule {}
