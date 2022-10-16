import { Directive, ObjectType, Field, ID } from '@nestjs/graphql';
import { Cart } from 'src/carts/entities/cart.entity';
import { OneToOne } from 'typeorm';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {

  @Field((type) => ID)
  @Directive('@external')
  id: number;

  @Field((type) => Cart)
  cart?: Cart;
}