import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { BaseArgs } from 'src/_bases/dto/base.args';
import { VariantFilterArgs } from './variant-filter.args';
import { VariantOrderArgs } from './variant-order.args';

@InputType()
export class VariantArgs extends BaseArgs {

    @Field(() => VariantFilterArgs, {nullable: true})
    filter: VariantFilterArgs

    @Field(() => VariantOrderArgs, {nullable: true})
    orderBy: VariantOrderArgs
    
}