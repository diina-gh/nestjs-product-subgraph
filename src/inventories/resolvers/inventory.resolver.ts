import { Resolver, Mutation, Query, Args, InputType, Int, Info, ResolveReference } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { InputError } from 'src/_bases/entities/input-error.entity';
import { ServerError } from 'src/_bases/entities/server-error.entity';
import { Repository } from 'typeorm';
import { InventoryArgs } from '../dto/inventory.args';
import { InventoryInput } from '../dto/inventory.input';
import { PaginatedInventory, PaginatedInventoryResult, Inventory, InventoryResult } from '../entities/inventory.entity';
import { InventoryService } from '../services/inventory.service';


@Resolver(() => Inventory)
export class InventoryResolver {

    constructor(
        private readonly inventoryService: InventoryService,
        @InjectRepository(Inventory) private inventoryRepository: Repository<Inventory>,
    ) {}

    @ResolveReference()
    resolveReference(reference: { __typename: string; id: number }): Inventory | any {
        return this.inventoryService.findOne(reference.id);
    }

    @Query(() => InventoryResult, {name: 'inventory'})
    public async getOne(@Args('id') id: number): Promise<typeof InventoryResult> {
        try {
            const inventory = await this.inventoryService.findOne(id);
            if (!inventory) return new InputError("Ce stock n'éxiste pas.") 
            return inventory
        } catch (error) {
            return new ServerError("Une erreur est survenue.", error) 
        };
    }

    @Query(() => PaginatedInventoryResult, {name: 'inventories'})
    public async getMany(@Args('inventoryArgs') inventoriesArgs: InventoryArgs, @Info() infos: any): Promise<typeof PaginatedInventoryResult> {
        try {
            const inventories = await this.inventoryService.findAll(inventoriesArgs, infos, 'inventories');
            const count  = await this.inventoryService.count(inventoriesArgs)
            const hasNext = (count - (++(inventoriesArgs.page) * inventoriesArgs.take)) > 0
            return new PaginatedInventory(inventories, count, hasNext)
        } catch (error) {
            return new ServerError("Une erreur est survenue.", error) 
        }
    }

    @Mutation(() => InventoryResult, { name: 'saveInventory' })
    public async upsert(@Args('inventoryInput') inventoryInput: InventoryInput): Promise<typeof InventoryResult> {
        try {
            if(inventoryInput.id){
                const updated = await this.inventoryService.update(inventoryInput.id, inventoryInput)
                if(updated) return await this.inventoryService.findOne(inventoryInput.id)
                else return new InputError("Ce stock n'éxiste pas.")
            } 
    
            let entity = this.inventoryRepository.create(inventoryInput);
            return await this.inventoryService.create(entity);
        } 
        catch (e) {
            return new ServerError("Une erreur est survenue.", e) 
        }
    }

    @Mutation(() => InventoryResult, { name: 'deleteInventory' })
    public async delete(@Args('id', { type: () => Int }) id: number): Promise<typeof InventoryResult>  {
        try {
            const item = await this.inventoryService.findOne(id)
            if(item) await this.inventoryService.delete(id)
            else return new InputError("Ce stock n'éxiste pas.")
            return item
        } 
        catch (e) {
            return new ServerError("Une erreur est survenue.", e) 
        }

    }

}