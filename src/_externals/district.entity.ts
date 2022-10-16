import { Directive, ObjectType, Field, ID } from '@nestjs/graphql';
import { Order } from 'src/orders/entities/order.entity';
import { OneToOne } from 'typeorm';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class District {

  @Field((type) => ID)
  @Directive('@external')
  id: number;

  @Field((type) => [Order])
  orders: Order[];
}