import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SearchrArgs {

    @Field({nullable: true})
    searchQuery: string;

    @Field(() => [String], {nullable: true})
    searchBy: string[];

}