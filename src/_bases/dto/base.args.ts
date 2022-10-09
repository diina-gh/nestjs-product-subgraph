import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min, Length, min } from 'class-validator';

@InputType()
export class BaseArgs {

    @Field(() => Int)
    @Min(1, {message: `L'argument page ne doit pas être supérieur à 1.`})
    page = 1;

    @Field(() => Int)
    @Length(1, 100)
    take = 10;

}