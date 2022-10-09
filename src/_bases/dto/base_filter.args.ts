import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min, Length, IsString, IsBoolean } from 'class-validator';
import { SearchrArgs } from './search.args';

@InputType()
export class BaseFilterArgs {

    @Field({nullable: true})
    id: number;

    @Field({nullable: true})
    activated: boolean;

    @Field({nullable: true})
    search: SearchrArgs;

}