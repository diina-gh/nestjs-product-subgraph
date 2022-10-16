import { forwardRef, HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/_bases/services/base.service';
import { Brackets, ILike, Like, Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryService extends BaseService<Category> {

  constructor(
    @InjectRepository(Category)
    private itemRepository: Repository<Category>,
  ) 
  {
    super(itemRepository);
  }


}
