import { createUnionType, Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { OrderItem } from 'src/order-items/entities/order-item.entity';
import { BaseModel } from 'src/_bases/entities/base.entity';
import { InputError } from 'src/_bases/entities/input-error.entity';
import { PaginatedBase } from 'src/_bases/entities/paginated-base.entity';
import { ServerError } from 'src/_bases/entities/server-error.entity';
import { District } from 'src/_externals/district.entity';
import { User } from 'src/_externals/user.entity';
import { Column, Entity, In, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType('Order')
@Directive('@key(fields: "id")')
@Entity({name: 'orders'})
export class Order extends BaseModel {

  @Field((type) => ID)
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Field()
  @Column({ length: 200, nullable:true })
  firstname: string;

  @Field()
  @Column({ length: 200, nullable:true })
  lastname: string;

  @Field()
  @Column({ length: 200, nullable:true })
  email: string;

  @Field()
  @Column({ length: 20, nullable:true })
  phone: string;

  @Field()
  @Column({ length: 500 })
  line1: string;

  @Field({nullable: true})
  @Column({ length: 500, nullable: true })
  line2: string;

  @Field((type) => Int)
  districtId: number;

  @Field((type) => District)
  district?: District;

  @Field()
  @Column({ nullable:true, default: 0 })
  subTotal: number;

  @Field()
  @Column({ nullable:true, default: 0 })
  tax: number;

  @Field()
  @Column({ nullable:true, default: 0 })
  shipping: number;

  @Field()
  @Column({ nullable:true, default: 0 })
  total: number;

  @Field((type) => Int, {nullable: true})
  userId: number;

  @Field((type) => User, {nullable: true})
  user?: User;

  @Field((type) => [OrderItem])
  @OneToMany(() => OrderItem, (orderItems) => orderItems.order)
  orderItems: OrderItem[];

}

@ObjectType('PaginatedOrder')
export class PaginatedOrder extends PaginatedBase {

  @Field(() => [Order])
  orders: Order[];

  constructor(orders: Order[], count: number, hasNext: boolean){
    super(count, hasNext)
    this.orders = orders
  }

}

export const OrderResult = createUnionType({
  name: 'OrderResult',
  types: () => [Order, InputError, ServerError] as const,
});

export const PaginatedOrderResult = createUnionType({
  name: 'PaginatedOrderResult',
  types: () => [PaginatedOrder, InputError, ServerError] as const,
});
