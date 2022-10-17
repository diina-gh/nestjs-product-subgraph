import { forwardRef, HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/_bases/services/base.service';
import { Brackets, ILike, Like, Repository } from 'typeorm';
import { Variant } from '../entities/variant.entity';

@Injectable()
export class VariantService extends BaseService<Variant> {

  constructor(
    @InjectRepository(Variant)
    private itemRepository: Repository<Variant>,
  ) 
  {
    super(itemRepository);
  }


}
