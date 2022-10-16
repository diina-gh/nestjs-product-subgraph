

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderResolver } from './resolvers/order.resolver';
import { OrderService } from './services/order.service';

@Module({
  imports:[TypeOrmModule.forFeature([Order])],
  providers: [OrderResolver, OrderService]
})
export class OrderModule {}
