import { InputType, Int, Field } from '@nestjs/graphql';
import { BaseInput } from 'src/_bases/dto/base.input';
import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Max } from "class-validator";

@InputType()
export class OrderInput extends BaseInput {

    @Field({nullable: true})
    firstname: string;
  
    @Field({nullable: true})
    lastname: string;
  
    @Field({nullable: true})
    email: string;
  
    @Field({nullable: true})
    phone: string;
  
    @Field({nullable: true})
    line1: string;
  
    @Field({nullable: true})
    line2: string;
  
    @Field({nullable: true})
    districtId: number;
  
    @Field({nullable: true})
    userId: number;
  
}