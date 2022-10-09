import { forwardRef, HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/_bases/services/base.service';
import { Brackets, ILike, Like, Repository } from 'typeorm';
import { Menu } from '../entities/menu.entity';

@Injectable()
export class MenuService extends BaseService<Menu> {

  constructor(
    @InjectRepository(Menu)
    private itemRepository: Repository<Menu>,
  ) 
  {
    super(itemRepository);
  }


}
