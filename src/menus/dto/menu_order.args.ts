import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { BaseOrderArgs } from 'src/_bases/dto/base_order.args';
import { Sort } from 'src/_bases/enums/sort.enum';

@InputType()
export class MenuOrderArgs extends BaseOrderArgs {}