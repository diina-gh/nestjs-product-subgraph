import { ArgsType, Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { BaseFilterArgs } from 'src/_bases/dto/base_filter.args';

@InputType()
export class MenuFilterArgs extends BaseFilterArgs {}