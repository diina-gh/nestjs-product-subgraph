

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuVariant } from './entities/menu-variant.entity';
import { MenuVariantResolver } from './resolvers/menu-variant.resolver';
import { MenuVariantService } from './services/menu-variant.service';

@Module({
  imports:[TypeOrmModule.forFeature([MenuVariant])],
  providers: [MenuVariantResolver, MenuVariantService]
})
export class MenuVariantModule {}
