

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuOption } from './entities/menu-option.entity';
import { MenuOptionResolver } from './resolvers/menu-option.resolver';
import { MenuOptionService } from './services/menu-option.service';

@Module({
  imports:[TypeOrmModule.forFeature([MenuOption])],
  providers: [MenuOptionResolver, MenuOptionService]
})
export class MenuOptionModule {}
