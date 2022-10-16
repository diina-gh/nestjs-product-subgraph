import { forwardRef, HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/_bases/services/base.service';
import { Brackets, ILike, Like, Repository } from 'typeorm';
import { Cart } from '../entities/cart.entity';

@Injectable()
export class CartService extends BaseService<Cart> {

  constructor(
    @InjectRepository(Cart)
    private itemRepository: Repository<Cart>,
  ) 
  {
    super(itemRepository);
  }


}
