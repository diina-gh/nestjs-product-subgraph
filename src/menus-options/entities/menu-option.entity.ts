import { createUnionType, Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Menu } from 'src/menus/entities/menu.entity';
import { Option } from 'src/options/entities/option.entity';
import { Variant } from 'src/variants/entities/variant.entity';
import { BaseModel } from 'src/_bases/entities/base.entity';
import { InputError } from 'src/_bases/entities/input-error.entity';
import { PaginatedBase } from 'src/_bases/entities/paginated-base.entity';
import { ServerError } from 'src/_bases/entities/server-error.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType('MenuOption')
@Directive('@key(fields: "id")')
@Entity({name: 'menus-options'})
export class MenuOption extends BaseModel {

  @Field((type) => ID)
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Field()
  @Column({ nullable:false })
  menuId: number;

  @Field((type) => Menu)
  @ManyToOne(() => Menu, (menu) => menu.menusOptions)
  menu: Menu;

  @Field()
  @Column({ nullable:false })
  optionId: number;

  @Field((type) => Option)
  @ManyToOne(() => Option, (option) => option.menusOptions)
  option: Option;

}

@ObjectType('PaginatedMenuOption')
export class PaginatedMenuOption extends PaginatedBase {

  @Field(() => [MenuOption])
  menuOptions: MenuOption[];

  constructor(menuOptions: MenuOption[], count: number, hasNext: boolean){
    super(count, hasNext)
    this.menuOptions = menuOptions
  }

}

export const MenuOptionResult = createUnionType({
  name: 'MenuOptionResult',
  types: () => [MenuOption, InputError, ServerError] as const,
});

export const PaginatedMenuOptionResult = createUnionType({
  name: 'PaginatedMenuOptionResult',
  types: () => [PaginatedMenuOption, InputError, ServerError] as const,
});
