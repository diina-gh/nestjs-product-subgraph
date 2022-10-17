

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { OptionResolver } from './resolvers/option.resolver';
import { OptionService } from './services/option.service';

@Module({
  imports:[TypeOrmModule.forFeature([Option])],
  providers: [OptionResolver, OptionService]
})
export class OptionModule {}
