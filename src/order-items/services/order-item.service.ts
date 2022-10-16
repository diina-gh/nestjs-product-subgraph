import { forwardRef, HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/_bases/services/base.service';
import { Brackets, ILike, Like, Repository } from 'typeorm';
import { OrderItem } from '../entities/order-item.entity';

@Injectable()
export class OrderItemService extends BaseService<OrderItem> {

  constructor(
    @InjectRepository(OrderItem)
    private itemRepository: Repository<OrderItem>,
  ) 
  {
    super(itemRepository);
  }


}
