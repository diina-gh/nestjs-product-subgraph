import { Resolver, Mutation, Query, Args, InputType, Int, Info, ResolveReference } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { InputError } from 'src/_bases/entities/input-error.entity';
import { ServerError } from 'src/_bases/entities/server-error.entity';
import { Repository } from 'typeorm';
import { VariantArgs } from '../dto/variant.args';
import { VariantInput } from '../dto/variant.input';
import { PaginatedVariant, PaginatedVariantResult, Variant, VariantResult } from '../entities/variant.entity';
import { VariantService } from '../services/variant.service';


@Resolver(() => Variant)
export class VariantResolver {

    constructor(
        private readonly variantService: VariantService,
        @InjectRepository(Variant) private variantRepository: Repository<Variant>,
    ) {}

    @ResolveReference()
    resolveReference(reference: { __typename: string; id: number }): Variant | any {
        return this.variantService.findOne(reference.id);
    }

    @Query(() => VariantResult, {name: 'variant'})
    public async getOne(@Args('id') id: number): Promise<typeof VariantResult> {
        try {
            const variant = await this.variantService.findOne(id);
            if (!variant) return new InputError("Ce variant n'éxiste pas.") 
            return variant
        } catch (error) {
            return new ServerError("Une erreur est survenue.", error) 
        };
    }

    @Query(() => PaginatedVariantResult, {name: 'variants'})
    public async getMany(@Args('variantArgs') variantsArgs: VariantArgs, @Info() infos: any): Promise<typeof PaginatedVariantResult> {
        try {
            const variants = await this.variantService.findAll(variantsArgs, infos, 'variants');
            const count  = await this.variantService.count(variantsArgs)
            const hasNext = (count - (++(variantsArgs.page) * variantsArgs.take)) > 0
            return new PaginatedVariant(variants, count, hasNext)
        } catch (error) {
            return new ServerError("Une erreur est survenue.", error) 
        }
    }

    @Mutation(() => VariantResult, { name: 'saveVariant' })
    public async upsert(@Args('variantInput') variantInput: VariantInput): Promise<typeof VariantResult> {
        try {
            if(variantInput.id){
                const updated = await this.variantService.update(variantInput.id, variantInput)
                if(updated) return await this.variantService.findOne(variantInput.id)
                else return new InputError("Ce variant n'éxiste pas.")
            } 
    
            let entity = this.variantRepository.create(variantInput);
            return await this.variantService.create(entity);
        } 
        catch (e) {
            return new ServerError("Une erreur est survenue.", e) 
        }
    }

    @Mutation(() => VariantResult, { name: 'deleteVariant' })
    public async delete(@Args('id', { type: () => Int }) id: number): Promise<typeof VariantResult>  {
        try {
            const item = await this.variantService.findOne(id)
            if(item) await this.variantService.delete(id)
            else return new InputError("Ce variant n'éxiste pas.")
            return item
        } 
        catch (e) {
            return new ServerError("Une erreur est survenue.", e) 
        }

    }

}