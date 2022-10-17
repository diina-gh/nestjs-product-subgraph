import { Resolver, Mutation, Query, Args, InputType, Int, Info, ResolveReference } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { InputError } from 'src/_bases/entities/input-error.entity';
import { ServerError } from 'src/_bases/entities/server-error.entity';
import { Repository } from 'typeorm';
import { MenuVariantArgs } from '../dto/menu-variant.args';
import { MenuVariantInput } from '../dto/menu-variant.input';
import { PaginatedMenuVariant, PaginatedMenuVariantResult, MenuVariant, MenuVariantResult } from '../entities/menu-variant.entity';
import { MenuVariantService } from '../services/menu-variant.service';


@Resolver(() => MenuVariant)
export class MenuVariantResolver {

    constructor(
        private readonly menuVariantService: MenuVariantService,
        @InjectRepository(MenuVariant) private menuVariantRepository: Repository<MenuVariant>,
    ) {}

    @ResolveReference()
    resolveReference(reference: { __typename: string; id: number }): MenuVariant | any {
        return this.menuVariantService.findOne(reference.id);
    }

    @Query(() => MenuVariantResult, {name: 'menuVariant'})
    public async getOne(@Args('id') id: number): Promise<typeof MenuVariantResult> {
        try {
            const menuVariant = await this.menuVariantService.findOne(id);
            if (!menuVariant) return new InputError("Ce menuVariant n'éxiste pas.") 
            return menuVariant
        } catch (error) {
            return new ServerError("Une erreur est survenue.", error) 
        };
    }

    @Query(() => PaginatedMenuVariantResult, {name: 'menuVariants'})
    public async getMany(@Args('menuVariantArgs') menuVariantsArgs: MenuVariantArgs, @Info() infos: any): Promise<typeof PaginatedMenuVariantResult> {
        try {
            const menuVariants = await this.menuVariantService.findAll(menuVariantsArgs, infos, 'menuVariants');
            const count  = await this.menuVariantService.count(menuVariantsArgs)
            const hasNext = (count - (++(menuVariantsArgs.page) * menuVariantsArgs.take)) > 0
            return new PaginatedMenuVariant(menuVariants, count, hasNext)
        } catch (error) {
            return new ServerError("Une erreur est survenue.", error) 
        }
    }

    @Mutation(() => MenuVariantResult, { name: 'saveMenuVariant' })
    public async upsert(@Args('menuVariantInput') menuVariantInput: MenuVariantInput): Promise<typeof MenuVariantResult> {
        try {
            if(menuVariantInput.id){
                const updated = await this.menuVariantService.update(menuVariantInput.id, menuVariantInput)
                if(updated) return await this.menuVariantService.findOne(menuVariantInput.id)
                else return new InputError("Ce menuVariant n'éxiste pas.")
            } 
    
            let entity = this.menuVariantRepository.create(menuVariantInput);
            return await this.menuVariantService.create(entity);
        } 
        catch (e) {
            return new ServerError("Une erreur est survenue.", e) 
        }
    }

    @Mutation(() => MenuVariantResult, { name: 'deleteMenuVariant' })
    public async delete(@Args('id', { type: () => Int }) id: number): Promise<typeof MenuVariantResult>  {
        try {
            const item = await this.menuVariantService.findOne(id)
            if(item) await this.menuVariantService.delete(id)
            else return new InputError("Ce menuVariant n'éxiste pas.")
            return item
        } 
        catch (e) {
            return new ServerError("Une erreur est survenue.", e) 
        }

    }

}