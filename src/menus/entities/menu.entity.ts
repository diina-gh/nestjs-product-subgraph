import { createUnionType, Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { CartItem } from 'src/cart-items/entities/cart-item.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Discount } from 'src/discounts/entities/discount.entity';
import { Inventory } from 'src/inventories/entities/inventory.entity';
import { MenuOption } from 'src/menus-options/entities/menu-option.entity';
import { MenuVariant } from 'src/menus-variants/entities/menu-variant.entity';
import { OrderItem } from 'src/order-items/entities/order-item.entity';
import { BaseModel } from 'src/_bases/entities/base.entity';
import { InputError } from 'src/_bases/entities/input-error.entity';
import { PaginatedBase } from 'src/_bases/entities/paginated-base.entity';
import { ServerError } from 'src/_bases/entities/server-error.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @Field((type) => [CartItem])
  @OneToMany(() => CartItem, (cartItems) => cartItems.menu)
  cartItems: CartItem[];

  @Field((type) => [OrderItem])
  @OneToMany(() => OrderItem, (orderItems) => orderItems.menu)
  orderItems: OrderItem[];

  @Field((type) => [MenuVariant])
  @OneToMany(() => MenuVariant, (menusVariants) => menusVariants.menu)
  menusVariants: MenuVariant[];

  @Field((type) => [MenuOption])
  @OneToMany(() => MenuOption, (menusOptions) => menusOptions.menu)
  menusOptions: MenuOption[];


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
