import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { BaseArgs } from 'src/_bases/dto/base.args';
import { CartFilterArgs } from './cart-filter.args';
import { CartOrderArgs } from './cart-order.args';

@InputType()
export class CartArgs extends BaseArgs {

    @Field(() => CartFilterArgs, {nullable: true})
    filter: CartFilterArgs

    @Field(() => CartOrderArgs, {nullable: true})
    orderBy: CartOrderArgs
    
}