import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { BaseArgs } from 'src/_bases/dto/base.args';
import { CategoryFilterArgs } from './category-filter.args';
import { CategoryOrderArgs } from './category-order.args';

@InputType()
export class CategoryArgs extends BaseArgs {

    @Field(() => CategoryFilterArgs, {nullable: true})
    filter: CategoryFilterArgs

    @Field(() => CategoryOrderArgs, {nullable: true})
    orderBy: CategoryOrderArgs
    
}