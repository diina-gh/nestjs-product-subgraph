import { Resolver, Mutation, Query, Args, InputType, Int, Info, ResolveReference } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { InputError } from 'src/_bases/entities/input-error.entity';
import { ServerError } from 'src/_bases/entities/server-error.entity';
import { Repository } from 'typeorm';
import { OrderItemArgs } from '../dto/order-item.args';
import { OrderItemInput } from '../dto/order-item.input';
import { PaginatedOrderItem, PaginatedOrderItemResult, OrderItem, OrderItemResult } from '../entities/order-item.entity';
import { OrderItemService } from '../services/order-item.service';


@Resolver(() => OrderItem)
export class OrderItemResolver {

    constructor(
        private readonly cartItemService: OrderItemService,
        @InjectRepository(OrderItem) private cartItemRepository: Repository<OrderItem>,
    ) {}

    @ResolveReference()
    resolveReference(reference: { __typename: string; id: number }): OrderItem | any {
        return this.cartItemService.findOne(reference.id);
    }

    @Query(() => OrderItemResult, {name: 'cartItem'})
    public async getOne(@Args('id') id: number): Promise<typeof OrderItemResult> {
        try {
            const cartItem = await this.cartItemService.findOne(id);
            if (!cartItem) return new InputError("Ce cartItem n'éxiste pas.") 
            return cartItem
        } catch (error) {
            return new ServerError("Une erreur est survenue.", error) 
        };
    }

    @Query(() => PaginatedOrderItemResult, {name: 'cartItems'})
    public async getMany(@Args('cartItemArgs') cartItemsArgs: OrderItemArgs, @Info() infos: any): Promise<typeof PaginatedOrderItemResult> {
        try {
            const cartItems = await this.cartItemService.findAll(cartItemsArgs, infos, 'cartItems');
            const count  = await this.cartItemService.count(cartItemsArgs)
            const hasNext = (count - (++(cartItemsArgs.page) * cartItemsArgs.take)) > 0
            return new PaginatedOrderItem(cartItems, count, hasNext)
        } catch (error) {
            return new ServerError("Une erreur est survenue.", error) 
        }
    }

    @Mutation(() => OrderItemResult, { name: 'saveOrderItem' })
    public async upsert(@Args('cartItemInput') cartItemInput: OrderItemInput): Promise<typeof OrderItemResult> {
        try {
            if(cartItemInput.id){
                const updated = await this.cartItemService.update(cartItemInput.id, cartItemInput)
                if(updated) return await this.cartItemService.findOne(cartItemInput.id)
                else return new InputError("Ce cartItem n'éxiste pas.")
            } 
    
            let entity = this.cartItemRepository.create(cartItemInput);
            return await this.cartItemService.create(entity);
        } 
        catch (e) {
            return new ServerError("Une erreur est survenue.", e) 
        }
    }

    @Mutation(() => OrderItemResult, { name: 'deleteOrderItem' })
    public async delete(@Args('id', { type: () => Int }) id: number): Promise<typeof OrderItemResult>  {
        try {
            const item = await this.cartItemService.findOne(id)
            if(item) await this.cartItemService.delete(id)
            else return new InputError("Ce cartItem n'éxiste pas.")
            return item
        } 
        catch (e) {
            return new ServerError("Une erreur est survenue.", e) 
        }

    }

}