import { forwardRef, HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/_bases/services/base.service';
import { Brackets, ILike, Like, Repository } from 'typeorm';
import { Discount } from '../entities/discount.entity';

@Injectable()
export class DiscountService extends BaseService<Discount> {

  constructor(
    @InjectRepository(Discount)
    private itemRepository: Repository<Discount>,
  ) 
  {
    super(itemRepository);
  }


}
