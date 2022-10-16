import { createUnionType, Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { CartItem } from 'src/cart-items/entities/cart-item.entity';
import { BaseModel } from 'src/_bases/entities/base.entity';
import { InputError } from 'src/_bases/entities/input-error.entity';
import { PaginatedBase } from 'src/_bases/entities/paginated-base.entity';
import { ServerError } from 'src/_bases/entities/server-error.entity';
import { User } from 'src/_externals/user.entity';
import { Column, Entity, In, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType('Cart')
@Directive('@key(fields: "id")')
@Entity({name: 'carts'})
export class Cart extends BaseModel {

  @Field((type) => ID)
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Field()
  @Column({ nullable:true, default: 0 })
  subTotal: number;

  @Field()
  @Column({ nullable:true, default: 0 })
  total: number;

  @Field((type) => Int)
  userId: number;

  @Field((type) => User)
  user?: User;

  @Field((type) => [CartItem])
  @OneToMany(() => CartItem, (cartItems) => cartItems.cart)
  cartItems: CartItem[];

}

@ObjectType('PaginatedCart')
export class PaginatedCart extends PaginatedBase {

  @Field(() => [Cart])
  carts: Cart[];

  constructor(carts: Cart[], count: number, hasNext: boolean){
    super(count, hasNext)
    this.carts = carts
  }

}

export const CartResult = createUnionType({
  name: 'CartResult',
  types: () => [Cart, InputError, ServerError] as const,
});

export const PaginatedCartResult = createUnionType({
  name: 'PaginatedCartResult',
  types: () => [PaginatedCart, InputError, ServerError] as const,
});
