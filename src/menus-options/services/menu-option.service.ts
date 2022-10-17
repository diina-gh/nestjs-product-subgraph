import { forwardRef, HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/_bases/services/base.service';
import { Brackets, ILike, Like, Repository } from 'typeorm';
import { MenuOption } from '../entities/menu-option.entity';

@Injectable()
export class MenuOptionService extends BaseService<MenuOption> {

  constructor(
    @InjectRepository(MenuOption)
    private itemRepository: Repository<MenuOption>,
  ) 
  {
    super(itemRepository);
  }


}
