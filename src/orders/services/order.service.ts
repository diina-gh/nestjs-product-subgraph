import { forwardRef, HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/_bases/services/base.service';
import { Brackets, ILike, Like, Repository } from 'typeorm';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderService extends BaseService<Order> {

  constructor(
    @InjectRepository(Order)
    private itemRepository: Repository<Order>,
  ) 
  {
    super(itemRepository);
  }


}
