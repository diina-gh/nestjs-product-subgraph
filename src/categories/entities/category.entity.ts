import { createUnionType, Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Menu } from 'src/menus/entities/menu.entity';
import { BaseModel } from 'src/_bases/entities/base.entity';
import { InputError } from 'src/_bases/entities/input-error.entity';
import { PaginatedBase } from 'src/_bases/entities/paginated-base.entity';
import { ServerError } from 'src/_bases/entities/server-error.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType('Category')
@Directive('@key(fields: "id")')
@Entity({name: 'categories'})
export class Category extends BaseModel {

  @Field((type) => ID)
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Field()
  @Column({ length: 200, nullable:true })
  name: string;

  @Field()
  @Column({ length: 1000, nullable: true })
  desc: string;

  @Field((type) => [Menu])
  @OneToMany(() => Menu, (menus) => menus.category)
  menus: Menu[];

}

@ObjectType('PaginatedCategory')
export class PaginatedCategory extends PaginatedBase {

  @Field(() => [Category])
  categories: Category[];

  constructor(categories: Category[], count: number, hasNext: boolean){
    super(count, hasNext)
    this.categories = categories
  }

}

export const CategoryResult = createUnionType({
  name: 'CategoryResult',
  types: () => [Category, InputError, ServerError] as const,
});

export const PaginatedCategoryResult = createUnionType({
  name: 'PaginatedCategoryResult',
  types: () => [PaginatedCategory, InputError, ServerError] as const,
});
