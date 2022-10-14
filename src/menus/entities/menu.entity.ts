import { createUnionType, Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/_bases/entities/base.entity';
import { InputError } from 'src/_bases/entities/input-error.entity';
import { PaginatedBase } from 'src/_bases/entities/paginated-base.entity';
import { ServerError } from 'src/_bases/entities/server-error.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType('Menu')
@Directive('@key(fields: "id")')
@Entity({name: 'menus'})
export class Menu extends BaseModel {

  @Field((type) => ID)
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Field()
  @Column({ length: 1000, nullable:true })
  detail: string;

}

@ObjectType('PaginatedMenu')
export class PaginatedMenu extends PaginatedBase {

  @Field(() => [Menu])
  menus: Menu[];

  constructor(menus: Menu[], count: number, hasNext: boolean){
    super(count, hasNext)
    this.menus = menus
  }

}

export const MenuResult = createUnionType({
  name: 'MenuResult',
  types: () => [Menu, InputError, ServerError] as const,
});

export const PaginatedMenuResult = createUnionType({
  name: 'PaginatedMenuResult',
  types: () => [PaginatedMenu, InputError, ServerError] as const,
});
