import { InputType, Int, Field } from '@nestjs/graphql';
import { BaseInput } from 'src/_bases/dto/base.input';
import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Max } from "class-validator";

@InputType()
export class OrderItemInput extends BaseInput {

    @Field({nullable: false})
    menuId: number;

    @Field({nullable: false})
    orderId: number;

    @Field({nullable: false})
    quantity: number;

    @Field({nullable: false})
    price: number;
  
    @Field({nullable: true})
    discount: number;

}