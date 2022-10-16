

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { InventoryResolver } from './resolvers/inventory.resolver';
import { InventoryService } from './services/inventory.service';

@Module({
  imports:[TypeOrmModule.forFeature([Inventory])],
  providers: [InventoryResolver, InventoryService]
})
export class InventoryModule {}
