import { Field, ObjectType, Int } from "@nestjs/graphql";

@ObjectType('ServerError')
export class ServerError {

  @Field(() => String)
  message: string

  @Field(() => String, {nullable: true})
  exception: any

  constructor(message: string, exception: any = null ){
    this.message = message
    this.exception = exception
  }

}