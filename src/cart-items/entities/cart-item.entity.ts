import { createUnionType, Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Cart } from 'src/carts/entities/cart.entity';
import { Menu } from 'src/menus/entities/menu.entity';
import { BaseModel } from 'src/_bases/entities/base.entity';
import { InputError } from 'src/_bases/entities/input-error.entity';
import { PaginatedBase } from 'src/_bases/entities/paginated-base.entity';
import { ServerError } from 'src/_bases/entities/server-error.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType('CartItem')
@Directive('@key(fields: "id")')
@Entity({name: 'cart-items'})
export class CartItem extends BaseModel {

  @Field((type) => ID)
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Field()
  @Column({ nullable:true })
  price: number;

  @Field()
  @Column({ nullable: true })
  discount: number;

  @Field()
  @Column({ nullable: true })
  quantity: number;

  @Field()
  @Column({ nullable:false })
  menuId: number;

  @Field((type) => Menu)
  @ManyToOne(() => Menu, (menu) => menu.cartItems)
  menu: Menu;

  @Field()
  @Column({ nullable:false })
  cartId: number;

  @Field((type) => Cart)
  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  cart: Cart;


}

@ObjectType('PaginatedCartItem')
export class PaginatedCartItem extends PaginatedBase {

  @Field(() => [CartItem])
  cartItems: CartItem[];

  constructor(cartItems: CartItem[], count: number, hasNext: boolean){
    super(count, hasNext)
    this.cartItems = cartItems
  }

}

export const CartItemResult = createUnionType({
  name: 'CartItemResult',
  types: () => [CartItem, InputError, ServerError] as const,
});

export const PaginatedCartItemResult = createUnionType({
  name: 'PaginatedCartItemResult',
  types: () => [PaginatedCartItem, InputError, ServerError] as const,
});
