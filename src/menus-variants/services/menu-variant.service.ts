import { forwardRef, HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/_bases/services/base.service';
import { Brackets, ILike, Like, Repository } from 'typeorm';
import { MenuVariant } from '../entities/menu-variant.entity';

@Injectable()
export class MenuVariantService extends BaseService<MenuVariant> {

  constructor(
    @InjectRepository(MenuVariant)
    private itemRepository: Repository<MenuVariant>,
  ) 
  {
    super(itemRepository);
  }


}
