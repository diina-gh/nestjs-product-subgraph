import { InputType, Int, Field } from '@nestjs/graphql';
import { BaseInput } from 'src/_bases/dto/base.input';
import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Max } from "class-validator";

@InputType()
export class VariantInput extends BaseInput {

    @Field({nullable: false})
    @Length(2, 200)
    name: string;
  
    @Field({nullable: false})
    @Length(1, 1000)  
    desc: string;

}