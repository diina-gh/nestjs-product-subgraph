import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, Length } from "class-validator";

@InputType()
export class BaseInput {

  @Field({nullable: true})
  id: number;

  @Field()
  @IsBoolean()
  activated: boolean;

}