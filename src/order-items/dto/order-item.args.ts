import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { BaseArgs } from 'src/_bases/dto/base.args';
import { OrderItemFilterArgs } from './order-item-filter.args';
import { OrderItemOrderArgs } from './order-item-order.args';

@InputType()
export class OrderItemArgs extends BaseArgs {

    @Field(() => OrderItemFilterArgs, {nullable: true})
    filter: OrderItemFilterArgs

    @Field(() => OrderItemOrderArgs, {nullable: true})
    orderBy: OrderItemOrderArgs
    
}