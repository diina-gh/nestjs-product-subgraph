

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { MenuResolver } from './resolvers/menu.resolver';
import { MenuService } from './services/menu.service';

@Module({
  imports:[TypeOrmModule.forFeature([Menu])],
  providers: [MenuResolver, MenuService]
})
export class MenuModule {}
