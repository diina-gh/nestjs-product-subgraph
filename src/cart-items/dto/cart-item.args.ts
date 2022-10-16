import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { BaseArgs } from 'src/_bases/dto/base.args';
import { CartItemFilterArgs } from './cart-item-filter.args';
import { CartItemOrderArgs } from './cart-item-order.args';

@InputType()
export class CartItemArgs extends BaseArgs {

    @Field(() => CartItemFilterArgs, {nullable: true})
    filter: CartItemFilterArgs

    @Field(() => CartItemOrderArgs, {nullable: true})
    orderBy: CartItemOrderArgs
    
}