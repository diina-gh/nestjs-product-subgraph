import { Resolver, Mutation, Query, Args, InputType, Int, Info, ResolveReference } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { InputError } from 'src/_bases/entities/input-error.entity';
import { ServerError } from 'src/_bases/entities/server-error.entity';
import { Repository } from 'typeorm';
import { CartItemArgs } from '../dto/cart-item.args';
import { CartItemInput } from '../dto/cart-item.input';
import { PaginatedCartItem, PaginatedCartItemResult, CartItem, CartItemResult } from '../entities/cart-item.entity';
import { CartItemService } from '../services/cart-item.service';


@Resolver(() => CartItem)
export class CartItemResolver {

    constructor(
        private readonly cartItemService: CartItemService,
        @InjectRepository(CartItem) private cartItemRepository: Repository<CartItem>,
    ) {}

    @ResolveReference()
    resolveReference(reference: { __typename: string; id: number }): CartItem | any {
        return this.cartItemService.findOne(reference.id);
    }

    @Query(() => CartItemResult, {name: 'cartItem'})
    public async getOne(@Args('id') id: number): Promise<typeof CartItemResult> {
        try {
            const cartItem = await this.cartItemService.findOne(id);
            if (!cartItem) return new InputError("Ce cartItem n'éxiste pas.") 
            return cartItem
        } catch (error) {
            return new ServerError("Une erreur est survenue.", error) 
        };
    }

    @Query(() => PaginatedCartItemResult, {name: 'cartItems'})
    public async getMany(@Args('cartItemArgs') cartItemsArgs: CartItemArgs, @Info() infos: any): Promise<typeof PaginatedCartItemResult> {
        try {
            const cartItems = await this.cartItemService.findAll(cartItemsArgs, infos, 'cartItems');
            const count  = await this.cartItemService.count(cartItemsArgs)
            const hasNext = (count - (++(cartItemsArgs.page) * cartItemsArgs.take)) > 0
            return new PaginatedCartItem(cartItems, count, hasNext)
        } catch (error) {
            return new ServerError("Une erreur est survenue.", error) 
        }
    }

    @Mutation(() => CartItemResult, { name: 'saveCartItem' })
    public async upsert(@Args('cartItemInput') cartItemInput: CartItemInput): Promise<typeof CartItemResult> {
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

    @Mutation(() => CartItemResult, { name: 'deleteCartItem' })
    public async delete(@Args('id', { type: () => Int }) id: number): Promise<typeof CartItemResult>  {
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