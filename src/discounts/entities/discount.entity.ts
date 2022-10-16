import { createUnionType, Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Menu } from 'src/menus/entities/menu.entity';
import { BaseModel } from 'src/_bases/entities/base.entity';
import { InputError } from 'src/_bases/entities/input-error.entity';
import { PaginatedBase } from 'src/_bases/entities/paginated-base.entity';
import { ServerError } from 'src/_bases/entities/server-error.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType('Discount')
@Directive('@key(fields: "id")')
@Entity({name: 'discounts'})
export class Discount extends BaseModel {

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
  @Column({ nullable: false })
  percent: number;


  @Field((type) => [Menu])
  @OneToMany(() => Menu, (menus) => menus.discount)
  menus: Menu[];

}

@ObjectType('PaginatedDiscount')
export class PaginatedDiscount extends PaginatedBase {

  @Field(() => [Discount])
  discounts: Discount[];

  constructor(discounts: Discount[], count: number, hasNext: boolean){
    super(count, hasNext)
    this.discounts = discounts
  }

}

export const DiscountResult = createUnionType({
  name: 'DiscountResult',
  types: () => [Discount, InputError, ServerError] as const,
});

export const PaginatedDiscountResult = createUnionType({
  name: 'PaginatedDiscountResult',
  types: () => [PaginatedDiscount, InputError, ServerError] as const,
});
