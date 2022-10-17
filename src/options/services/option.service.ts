import { forwardRef, HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/_bases/services/base.service';
import { Brackets, ILike, Like, Repository } from 'typeorm';
import { Option } from '../entities/option.entity';

@Injectable()
export class OptionService extends BaseService<Option> {

  constructor(
    @InjectRepository(Option)
    private itemRepository: Repository<Option>,
  ) 
  {
    super(itemRepository);
  }


}
