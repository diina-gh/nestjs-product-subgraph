

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variant } from './entities/variant.entity';
import { VariantResolver } from './resolvers/variant.resolver';
import { VariantService } from './services/variant.service';

@Module({
  imports:[TypeOrmModule.forFeature([Variant])],
  providers: [VariantResolver, VariantService]
})
export class VariantModule {}
