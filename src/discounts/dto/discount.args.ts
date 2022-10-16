import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { BaseArgs } from 'src/_bases/dto/base.args';
import { DiscountFilterArgs } from './discount-filter.args';
import { DiscountOrderArgs } from './discount-order.args';

@InputType()
export class DiscountArgs extends BaseArgs {

    @Field(() => DiscountFilterArgs, {nullable: true})
    filter: DiscountFilterArgs

    @Field(() => DiscountOrderArgs, {nullable: true})
    orderBy: DiscountOrderArgs
    
}