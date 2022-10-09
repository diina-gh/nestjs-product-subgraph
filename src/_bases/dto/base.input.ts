import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, Length } from "class-validator";

@InputType()
export class BaseInput {

  @Field({nullable: true})
  id: number;

  @Field({nullable: true})
  @Length(2, 200)
  name: string;

  @Field({nullable: true})
  @Length(1, 1000)  
  desc: string;

  @Field()
  @IsBoolean()
  activated: boolean;

}