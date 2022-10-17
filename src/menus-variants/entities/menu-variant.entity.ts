import { createUnionType, Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Menu } from 'src/menus/entities/menu.entity';
import { Variant } from 'src/variants/entities/variant.entity';
import { BaseModel } from 'src/_bases/entities/base.entity';
import { InputError } from 'src/_bases/entities/input-error.entity';
import { PaginatedBase } from 'src/_bases/entities/paginated-base.entity';
import { ServerError } from 'src/_bases/entities/server-error.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType('MenuVariant')
@Directive('@key(fields: "id")')
@Entity({name: 'menus-variants'})
export class MenuVariant extends BaseModel {

  @Field((type) => ID)
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Field()
  @Column({ nullable:false })
  menuId: number;

  @Field((type) => Menu)
  @ManyToOne(() => Menu, (menu) => menu.menusVariants)
  menu: Menu;

  @Field()
  @Column({ nullable:false })
  variantId: number;

  @Field((type) => Variant)
  @ManyToOne(() => Variant, (variant) => variant.menusVariants)
  variant: Variant;

}

@ObjectType('PaginatedMenuVariant')
export class PaginatedMenuVariant extends PaginatedBase {

  @Field(() => [MenuVariant])
  menuVariants: MenuVariant[];

  constructor(menuVariants: MenuVariant[], count: number, hasNext: boolean){
    super(count, hasNext)
    this.menuVariants = menuVariants
  }

}

export const MenuVariantResult = createUnionType({
  name: 'MenuVariantResult',
  types: () => [MenuVariant, InputError, ServerError] as const,
});

export const PaginatedMenuVariantResult = createUnionType({
  name: 'PaginatedMenuVariantResult',
  types: () => [PaginatedMenuVariant, InputError, ServerError] as const,
});
