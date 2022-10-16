

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { OrderItemResolver } from './resolvers/order-item.resolver';
import { OrderItemService } from './services/order-item.service';

@Module({
  imports:[TypeOrmModule.forFeature([OrderItem])],
  providers: [OrderItemResolver, OrderItemService]
})
export class OrderItemModule {}
