import { Resolver, Mutation, Query, Args, InputType, Int, Info, ResolveReference, ResolveField, Parent } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { InputError } from 'src/_bases/entities/input-error.entity';
import { ServerError } from 'src/_bases/entities/server-error.entity';
import { User } from 'src/_externals/user.entity';
import { Repository } from 'typeorm';
import { CartArgs } from '../dto/cart.args';
import { CartInput } from '../dto/cart.input';
import { PaginatedCart, PaginatedCartResult, Cart, CartResult } from '../entities/cart.entity';
import { CartService } from '../services/cart.service';


@Resolver(() => Cart)
export class CartResolver {

    constructor(
        private readonly cartService: CartService,
        @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    ) {}

    @ResolveReference()
    resolveReference(reference: { __typename: string; id: number }): Cart | any {
        return this.cartService.findOne(reference.id);
    }

    @ResolveField((of) => User)
    user(@Parent() cart: Cart): any {
      return { __typename: 'User', id: cart.userId };
    }

    @Query(() => CartResult, {name: 'cart'})
    public async getOne(@Args('id') id: number): Promise<typeof CartResult> {
        try {
            const cart = await this.cartService.findOne(id);
            if (!cart) return new InputError("Ce cart n'éxiste pas.") 
            return cart
        } catch (error) {
            return new ServerError("Une erreur est survenue.", error) 
        };
    }

    @Query(() => PaginatedCartResult, {name: 'carts'})
    public async getMany(@Args('cartArgs') cartsArgs: CartArgs, @Info() infos: any): Promise<typeof PaginatedCartResult> {
        try {
            const carts = await this.cartService.findAll(cartsArgs, infos, 'carts');
            const count  = await this.cartService.count(cartsArgs)
            const hasNext = (count - (++(cartsArgs.page) * cartsArgs.take)) > 0
            return new PaginatedCart(carts, count, hasNext)
        } catch (error) {
            return new ServerError("Une erreur est survenue.", error) 
        }
    }

    @Mutation(() => CartResult, { name: 'saveCart' })
    public async upsert(@Args('cartInput') cartInput: CartInput): Promise<typeof CartResult> {
        try {
            if(cartInput.id){
                const updated = await this.cartService.update(cartInput.id, cartInput)
                if(updated) return await this.cartService.findOne(cartInput.id)
                else return new InputError("Ce cart n'éxiste pas.")
            } 
    
            let entity = this.cartRepository.create(cartInput);
            return await this.cartService.create(entity);
        } 
        catch (e) {
            return new ServerError("Une erreur est survenue.", e) 
        }
    }

    @Mutation(() => CartResult, { name: 'deleteCart' })
    public async delete(@Args('id', { type: () => Int }) id: number): Promise<typeof CartResult>  {
        try {
            const item = await this.cartService.findOne(id)
            if(item) await this.cartService.delete(id)
            else return new InputError("Ce cart n'éxiste pas.")
            return item
        } 
        catch (e) {
            return new ServerError("Une erreur est survenue.", e) 
        }

    }

}