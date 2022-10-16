import { createUnionType, Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/categories/entities/category.entity';
import { Discount } from 'src/discounts/entities/discount.entity';
import { Inventory } from 'src/inventories/entities/inventory.entity';
import { BaseModel } from 'src/_bases/entities/base.entity';
import { InputError } from 'src/_bases/entities/input-error.entity';
import { PaginatedBase } from 'src/_bases/entities/paginated-base.entity';
import { ServerError } from 'src/_bases/entities/server-error.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType('Menu')
@Directive('@key(fields: "id")')
@Entity({name: 'menus'})
export class Menu extends BaseModel {

  @Field((type) => ID)
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Field()
  @Column({ length: 200, nullable:true })
  name: string;

  @Field()
  @Column({ length: 1000, nullable: true })
  desc: string;

  @Field()
  @Column({ length: 1000, nullable:true })
  detail: string;

  @Field()
  @Column({ nullable:false })
  categoryId: number;

  @Field((type) => Category)
  @ManyToOne(() => Category, (category) => category.menus)
  category: Category;

  @Field()
  @Column({ nullable:true })
  inventoryId: number;

  @Field((type) => Inventory)
  @OneToOne(() => Inventory, (inventory) => inventory.menu)
  inventory: Inventory;


  @Field()
  @Column({ nullable:false })
  discountId: number;

  @Field((type) => Discount)
  @ManyToOne(() => Discount, (discount) => discount.menus)
  discount: Discount;


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
