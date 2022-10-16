import { createUnionType, Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Menu } from 'src/menus/entities/menu.entity';
import { BaseModel } from 'src/_bases/entities/base.entity';
import { InputError } from 'src/_bases/entities/input-error.entity';
import { PaginatedBase } from 'src/_bases/entities/paginated-base.entity';
import { ServerError } from 'src/_bases/entities/server-error.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType('Inventory')
@Directive('@key(fields: "id")')
@Entity({name: 'inventories'})
export class Inventory extends BaseModel {

  @Field((type) => ID)
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Field()
  @Column({ nullable:false })
  quantity: number;

  @Field()
  @Column({ nullable:true })
  menuId: number;

  @Field((type) => Menu)
  @OneToOne(() => Menu, (menu) => menu.inventory)
  menu: Menu;

}

@ObjectType('PaginatedInventory')
export class PaginatedInventory extends PaginatedBase {

  @Field(() => [Inventory])
  inventories: Inventory[];

  constructor(inventories: Inventory[], count: number, hasNext: boolean){
    super(count, hasNext)
    this.inventories = inventories
  }

}

export const InventoryResult = createUnionType({
  name: 'InventoryResult',
  types: () => [Inventory, InputError, ServerError] as const,
});

export const PaginatedInventoryResult = createUnionType({
  name: 'PaginatedInventoryResult',
  types: () => [PaginatedInventory, InputError, ServerError] as const,
});
