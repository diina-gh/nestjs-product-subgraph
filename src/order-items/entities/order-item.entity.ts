import { createUnionType, Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Order } from 'src/orders/entities/order.entity';
import { Menu } from 'src/menus/entities/menu.entity';
import { BaseModel } from 'src/_bases/entities/base.entity';
import { InputError } from 'src/_bases/entities/input-error.entity';
import { PaginatedBase } from 'src/_bases/entities/paginated-base.entity';
import { ServerError } from 'src/_bases/entities/server-error.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType('OrderItem')
@Directive('@key(fields: "id")')
@Entity({name: 'order-items'})
export class OrderItem extends BaseModel {

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
  @ManyToOne(() => Menu, (menu) => menu.orderItems)
  menu: Menu;

  @Field()
  @Column({ nullable:false })
  orderId: number;

  @Field((type) => Order)
  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;


}

@ObjectType('PaginatedOrderItem')
export class PaginatedOrderItem extends PaginatedBase {

  @Field(() => [OrderItem])
  orderItems: OrderItem[];

  constructor(orderItems: OrderItem[], count: number, hasNext: boolean){
    super(count, hasNext)
    this.orderItems = orderItems
  }

}

export const OrderItemResult = createUnionType({
  name: 'OrderItemResult',
  types: () => [OrderItem, InputError, ServerError] as const,
});

export const PaginatedOrderItemResult = createUnionType({
  name: 'PaginatedOrderItemResult',
  types: () => [PaginatedOrderItem, InputError, ServerError] as const,
});
