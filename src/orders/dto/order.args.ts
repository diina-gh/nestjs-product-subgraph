import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { BaseArgs } from 'src/_bases/dto/base.args';
import { OrderFilterArgs } from './order-filter.args';
import { OrderOrderArgs } from './order-order.args';

@InputType()
export class OrderArgs extends BaseArgs {

    @Field(() => OrderFilterArgs, {nullable: true})
    filter: OrderFilterArgs

    @Field(() => OrderOrderArgs, {nullable: true})
    orderBy: OrderOrderArgs
    
}