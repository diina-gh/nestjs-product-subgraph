import { Resolver, Mutation, Query, Args, InputType, Int, Info, ResolveReference } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { InputError } from 'src/_bases/entities/input-error.entity';
import { ServerError } from 'src/_bases/entities/server-error.entity';
import { Repository } from 'typeorm';
import { MenuOptionArgs } from '../dto/menu-option.args';
import { MenuOptionInput } from '../dto/menu-option.input';
import { PaginatedMenuOption, PaginatedMenuOptionResult, MenuOption, MenuOptionResult } from '../entities/menu-option.entity';
import { MenuOptionService } from '../services/menu-option.service';


@Resolver(() => MenuOption)
export class MenuOptionResolver {

    constructor(
        private readonly menuOptionService: MenuOptionService,
        @InjectRepository(MenuOption) private menuOptionRepository: Repository<MenuOption>,
    ) {}

    @ResolveReference()
    resolveReference(reference: { __typename: string; id: number }): MenuOption | any {
        return this.menuOptionService.findOne(reference.id);
    }

    @Query(() => MenuOptionResult, {name: 'menuOption'})
    public async getOne(@Args('id') id: number): Promise<typeof MenuOptionResult> {
        try {
            const menuOption = await this.menuOptionService.findOne(id);
            if (!menuOption) return new InputError("Ce menuOption n'éxiste pas.") 
            return menuOption
        } catch (error) {
            return new ServerError("Une erreur est survenue.", error) 
        };
    }

    @Query(() => PaginatedMenuOptionResult, {name: 'menuOptions'})
    public async getMany(@Args('menuOptionArgs') menuOptionsArgs: MenuOptionArgs, @Info() infos: any): Promise<typeof PaginatedMenuOptionResult> {
        try {
            const menuOptions = await this.menuOptionService.findAll(menuOptionsArgs, infos, 'menuOptions');
            const count  = await this.menuOptionService.count(menuOptionsArgs)
            const hasNext = (count - (++(menuOptionsArgs.page) * menuOptionsArgs.take)) > 0
            return new PaginatedMenuOption(menuOptions, count, hasNext)
        } catch (error) {
            return new ServerError("Une erreur est survenue.", error) 
        }
    }

    @Mutation(() => MenuOptionResult, { name: 'saveMenuOption' })
    public async upsert(@Args('menuOptionInput') menuOptionInput: MenuOptionInput): Promise<typeof MenuOptionResult> {
        try {
            if(menuOptionInput.id){
                const updated = await this.menuOptionService.update(menuOptionInput.id, menuOptionInput)
                if(updated) return await this.menuOptionService.findOne(menuOptionInput.id)
                else return new InputError("Ce menuOption n'éxiste pas.")
            } 
    
            let entity = this.menuOptionRepository.create(menuOptionInput);
            return await this.menuOptionService.create(entity);
        } 
        catch (e) {
            return new ServerError("Une erreur est survenue.", e) 
        }
    }

    @Mutation(() => MenuOptionResult, { name: 'deleteMenuOption' })
    public async delete(@Args('id', { type: () => Int }) id: number): Promise<typeof MenuOptionResult>  {
        try {
            const item = await this.menuOptionService.findOne(id)
            if(item) await this.menuOptionService.delete(id)
            else return new InputError("Ce menuOption n'éxiste pas.")
            return item
        } 
        catch (e) {
            return new ServerError("Une erreur est survenue.", e) 
        }

    }

}