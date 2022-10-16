import { InputType, Int, Field } from '@nestjs/graphql';
import { BaseInput } from 'src/_bases/dto/base.input';
import { IsEmail, IsNotEmpty, isNumber, IsNumber, IsString, Length, Max } from "class-validator";

@InputType()
export class InventoryInput extends BaseInput {

    @Field({nullable: false})
    quantity: number;
  
    @Field({nullable: false})
    menuId: number;

}