import { Field, ObjectType, Int } from "@nestjs/graphql";
import { Any } from "typeorm";

@ObjectType('InputError')
export class InputError {

  @Field(() => String)
  message: string

  @Field(() => String, {nullable: true})
  input: string;

  @Field(() => String, {nullable: true})
  exception: any

  constructor(message: string, input: string = null, exception: any = null ){
    this.message = message
    this.input = input
    this.exception = exception
  }

}