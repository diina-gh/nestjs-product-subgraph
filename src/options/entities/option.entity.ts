import { createUnionType, Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { MenuOption } from 'src/menus-options/entities/menu-option.entity';
import { Variant } from 'src/variants/entities/variant.entity';
import { BaseModel } from 'src/_bases/entities/base.entity';
import { InputError } from 'src/_bases/entities/input-error.entity';
import { PaginatedBase } from 'src/_bases/entities/paginated-base.entity';
import { ServerError } from 'src/_bases/entities/server-error.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType('Option')
@Directive('@key(fields: "id")')
@Entity({name: 'options'})
export class Option extends BaseModel {

  @Field((type) => ID)
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Field()
  @Column({ length: 200, nullable:true })
  name: string;

  @Field()
  @Column({ length: 1000, nullable: true })
  desc: string;

  @Field()
  @Column({ nullable:false })
  variantId: number;

  @Field((type) => Variant)
  @ManyToOne(() => Variant, (variant) => variant.options)
  variant: Variant;

  @Field((type) => [MenuOption])
  @OneToMany(() => MenuOption, (menusOptions) => menusOptions.option)
  menusOptions: MenuOption[];

}

@ObjectType('PaginatedOption')
export class PaginatedOption extends PaginatedBase {

  @Field(() => [Option])
  options: Option[];

  constructor(options: Option[], count: number, hasNext: boolean){
    super(count, hasNext)
    this.options = options
  }

}

export const OptionResult = createUnionType({
  name: 'OptionResult',
  types: () => [Option, InputError, ServerError] as const,
});

export const PaginatedOptionResult = createUnionType({
  name: 'PaginatedOptionResult',
  types: () => [PaginatedOption, InputError, ServerError] as const,
});
