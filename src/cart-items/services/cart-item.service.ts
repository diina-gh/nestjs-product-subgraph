import { forwardRef, HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/_bases/services/base.service';
import { Brackets, ILike, Like, Repository } from 'typeorm';
import { CartItem } from '../entities/cart-item.entity';

@Injectable()
export class CartItemService extends BaseService<CartItem> {

  constructor(
    @InjectRepository(CartItem)
    private itemRepository: Repository<CartItem>,
  ) 
  {
    super(itemRepository);
  }


}
