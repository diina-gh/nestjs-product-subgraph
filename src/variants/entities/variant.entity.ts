import { createUnionType, Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { MenuVariant } from 'src/menus-variants/entities/menu-variant.entity';
import { Option } from 'src/options/entities/option.entity';
import { BaseModel } from 'src/_bases/entities/base.entity';
import { InputError } from 'src/_bases/entities/input-error.entity';
import { PaginatedBase } from 'src/_bases/entities/paginated-base.entity';
import { ServerError } from 'src/_bases/entities/server-error.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType('Variant')
@Directive('@key(fields: "id")')
@Entity({name: 'variants'})
export class Variant extends BaseModel {

  @Field((type) => ID)
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Field()
  @Column({ length: 200, nullable:true })
  name: string;

  @Field()
  @Column({ length: 1000, nullable: true })
  desc: string;

  @Field((type) => [Option])
  @OneToMany(() => Option, (options) => options.variant)
  options: Option[];

  @Field((type) => [MenuVariant])
  @OneToMany(() => MenuVariant, (menusVariants) => menusVariants.variant)
  menusVariants: MenuVariant[];

}

@ObjectType('PaginatedVariant')
export class PaginatedVariant extends PaginatedBase {

  @Field(() => [Variant])
  variants: Variant[];

  constructor(variants: Variant[], count: number, hasNext: boolean){
    super(count, hasNext)
    this.variants = variants
  }

}

export const VariantResult = createUnionType({
  name: 'VariantResult',
  types: () => [Variant, InputError, ServerError] as const,
});

export const PaginatedVariantResult = createUnionType({
  name: 'PaginatedVariantResult',
  types: () => [PaginatedVariant, InputError, ServerError] as const,
});
