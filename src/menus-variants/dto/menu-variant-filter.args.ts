import { ArgsType, Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { BaseFilterArgs } from 'src/_bases/dto/base-filter.args';

@InputType()
export class MenuVariantFilterArgs extends BaseFilterArgs {}