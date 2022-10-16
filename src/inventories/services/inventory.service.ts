import { forwardRef, HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/_bases/services/base.service';
import { Brackets, ILike, Like, Repository } from 'typeorm';
import { Inventory } from '../entities/inventory.entity';

@Injectable()
export class InventoryService extends BaseService<Inventory> {

  constructor(
    @InjectRepository(Inventory)
    private itemRepository: Repository<Inventory>,
  ) 
  {
    super(itemRepository);
  }


}
