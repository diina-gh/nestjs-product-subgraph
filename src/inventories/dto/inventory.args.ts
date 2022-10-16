import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { BaseArgs } from 'src/_bases/dto/base.args';
import { InventoryFilterArgs } from './inventory-filter.args';
import { InventoryOrderArgs } from './inventory-order.args';

@InputType()
export class InventoryArgs extends BaseArgs {

    @Field(() => InventoryFilterArgs, {nullable: true})
    filter: InventoryFilterArgs

    @Field(() => InventoryOrderArgs, {nullable: true})
    orderBy: InventoryOrderArgs
    
}