import { Field, ObjectType, Int } from "@nestjs/graphql";

@ObjectType()
export class PaginatedBase {

  @Field(() => Int)
  count: number

  @Field(() => Boolean)
  hasNext: boolean;

  constructor(count: number, haxNext: boolean){
    this.count = count
    this.hasNext = haxNext
  }

}