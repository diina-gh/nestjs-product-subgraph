import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { BaseArgs } from 'src/_bases/dto/base.args';
import { OptionFilterArgs } from './option-filter.args';
import { OptionOrderArgs } from './option-order.args';

@InputType()
export class OptionArgs extends BaseArgs {

    @Field(() => OptionFilterArgs, {nullable: true})
    filter: OptionFilterArgs

    @Field(() => OptionOrderArgs, {nullable: true})
    orderBy: OptionOrderArgs
    
}