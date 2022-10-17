import { InputType, Int, Field } from '@nestjs/graphql';
import { BaseInput } from 'src/_bases/dto/base.input';
import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Max } from "class-validator";

@InputType()
export class MenuOptionInput extends BaseInput {

    @Field({nullable: false})
    menuId: number;
  
    @Field({nullable: false})
    optionId: number;

}