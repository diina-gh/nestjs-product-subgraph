import { Resolver, Mutation, Query, Args, InputType, Int, Info, ResolveReference } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { InputError } from 'src/_bases/entities/input-error.entity';
import { ServerError } from 'src/_bases/entities/server-error.entity';
import { Repository } from 'typeorm';
import { DiscountArgs } from '../dto/discount.args';
import { DiscountInput } from '../dto/discount.input';
import { PaginatedDiscount, PaginatedDiscountResult, Discount, DiscountResult } from '../entities/discount.entity';
import { DiscountService } from '../services/discount.service';


@Resolver(() => Discount)
export class DiscountResolver {

    constructor(
        private readonly discountService: DiscountService,
        @InjectRepository(Discount) private discountRepository: Repository<Discount>,
    ) {}

    @ResolveReference()
    resolveReference(reference: { __typename: string; id: number }): Discount | any {
        return this.discountService.findOne(reference.id);
    }

    @Query(() => DiscountResult, {name: 'discount'})
    public async getOne(@Args('id') id: number): Promise<typeof DiscountResult> {
        try {
            const discount = await this.discountService.findOne(id);
            if (!discount) return new InputError("Cette promo n'éxiste pas.") 
            return discount
        } catch (error) {
            return new ServerError("Une erreur est survenue.", error) 
        };
    }

    @Query(() => PaginatedDiscountResult, {name: 'discounts'})
    public async getMany(@Args('discountArgs') discountsArgs: DiscountArgs, @Info() infos: any): Promise<typeof PaginatedDiscountResult> {
        try {
            const discounts = await this.discountService.findAll(discountsArgs, infos, 'discounts');
            const count  = await this.discountService.count(discountsArgs)
            const hasNext = (count - (++(discountsArgs.page) * discountsArgs.take)) > 0
            return new PaginatedDiscount(discounts, count, hasNext)
        } catch (error) {
            return new ServerError("Une erreur est survenue.", error) 
        }
    }

    @Mutation(() => DiscountResult, { name: 'saveDiscount' })
    public async upsert(@Args('discountInput') discountInput: DiscountInput): Promise<typeof DiscountResult> {
        try {
            if(discountInput.id){
                const updated = await this.discountService.update(discountInput.id, discountInput)
                if(updated) return await this.discountService.findOne(discountInput.id)
                else return new InputError("Cette promo n'éxiste pas.")
            } 
    
            let entity = this.discountRepository.create(discountInput);
            return await this.discountService.create(entity);
        } 
        catch (e) {
            return new ServerError("Une erreur est survenue.", e) 
        }
    }

    @Mutation(() => DiscountResult, { name: 'deleteDiscount' })
    public async delete(@Args('id', { type: () => Int }) id: number): Promise<typeof DiscountResult>  {
        try {
            const item = await this.discountService.findOne(id)
            if(item) await this.discountService.delete(id)
            else return new InputError("Cette promo n'éxiste pas.")
            return item
        } 
        catch (e) {
            return new ServerError("Une erreur est survenue.", e) 
        }

    }

}