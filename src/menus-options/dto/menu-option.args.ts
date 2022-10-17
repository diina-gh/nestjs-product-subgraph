import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { BaseArgs } from 'src/_bases/dto/base.args';
import { MenuOptionFilterArgs } from './menu-option-filter.args';
import { MenuOptionOrderArgs } from './menu-option-order.args';

@InputType()
export class MenuOptionArgs extends BaseArgs {

    @Field(() => MenuOptionFilterArgs, {nullable: true})
    filter: MenuOptionFilterArgs

    @Field(() => MenuOptionOrderArgs, {nullable: true})
    orderBy: MenuOptionOrderArgs
    
}