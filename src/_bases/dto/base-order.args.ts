import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { Sort } from '../enums/sort.enum';

@InputType()
export class BaseOrderArgs {

    @Field(() => Sort, {nullable: true})
    id: Sort;

    @Field(() => Sort, {nullable: true})
    name: Sort;

    @Field(() => Sort, {nullable: true})
    desc: Sort;

    @Field(() => Sort, {nullable: true})
    createdAt: Sort;

    @Field(() => Sort, {nullable: true})
    updatedAt: Sort;

}