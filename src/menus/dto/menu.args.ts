import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { BaseArgs } from 'src/_bases/dto/base.args';
import { MenuFilterArgs } from './menu_filter.args';
import { MenuOrderArgs } from './menu_order.args';

@InputType()
export class MenuArgs extends BaseArgs {

    @Field(() => MenuFilterArgs, {nullable: true})
    filter: MenuFilterArgs

    @Field(() => MenuOrderArgs, {nullable: true})
    orderBy: MenuOrderArgs
    
}