import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { BaseArgs } from 'src/_bases/dto/base.args';
import { MenuVariantFilterArgs } from './menu-variant-filter.args';
import { MenuVariantOrderArgs } from './menu-variant-order.args';

@InputType()
export class MenuVariantArgs extends BaseArgs {

    @Field(() => MenuVariantFilterArgs, {nullable: true})
    filter: MenuVariantFilterArgs

    @Field(() => MenuVariantOrderArgs, {nullable: true})
    orderBy: MenuVariantOrderArgs
    
}