import { Resolver, Mutation, Query, Args, InputType, Int, Info, ResolveReference } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { InputError } from 'src/_bases/entities/input-error.entity';
import { ServerError } from 'src/_bases/entities/server-error.entity';
import { Repository } from 'typeorm';
import { MenuArgs } from '../dto/menu.args';
import { MenuInput } from '../dto/menu.input';
import { PaginatedMenu, PaginatedMenuResult, Menu, MenuResult } from '../entities/menu.entity';
import { MenuService } from '../services/menu.service';


@Resolver(() => Menu)
export class MenuResolver {

    constructor(
        private readonly menuService: MenuService,
        @InjectRepository(Menu) private menuRepository: Repository<Menu>,
    ) {}

    @ResolveReference()
    resolveReference(reference: { __typename: string; id: number }): Menu | any {
        return this.menuService.findOne(reference.id);
    }

    @Query(() => MenuResult, {name: 'menu'})
    public async getOne(@Args('id') id: number): Promise<typeof MenuResult> {
        try {
            const menu = await this.menuService.findOne(id);
            if (!menu) return new InputError("Cet utilisateur n'éxiste pas.") 
            return menu
        } catch (error) {
            return new ServerError("Une erreur est survenue.", error) 
        };
    }

    @Query(() => PaginatedMenuResult, {name: 'menus'})
    public async getMany(@Args('menuArgs') menusArgs: MenuArgs, @Info() infos: any): Promise<typeof PaginatedMenuResult> {
        try {
            const menus = await this.menuService.findAll(menusArgs, infos, 'menus');
            const count  = await this.menuService.count(menusArgs)
            const hasNext = (count - (++(menusArgs.page) * menusArgs.take)) > 0
            return new PaginatedMenu(menus, count, hasNext)
        } catch (error) {
            return new ServerError("Une erreur est survenue.", error) 
        }
    }

    @Mutation(() => MenuResult, { name: 'saveMenu' })
    public async upsert(@Args('menuInput') menuInput: MenuInput): Promise<typeof MenuResult> {
        try {
            if(menuInput.id){
                const updated = await this.menuService.update(menuInput.id, menuInput)
                if(updated) return await this.menuService.findOne(menuInput.id)
                else return new InputError("Cette utilisateur n'éxiste pas.")
            } 
    
            let entity = this.menuRepository.create(menuInput);
            return await this.menuService.create(entity);
        } 
        catch (e) {
            return new ServerError("Une erreur est survenue.", e) 
        }
    }

    @Mutation(() => MenuResult, { name: 'deleteMenu' })
    public async delete(@Args('id', { type: () => Int }) id: number): Promise<typeof MenuResult>  {
        try {
            const item = await this.menuService.findOne(id)
            if(item) await this.menuService.delete(id)
            else return new InputError("Cette utilisateur n'éxiste pas.")
            return item
        } 
        catch (e) {
            return new ServerError("Une erreur est survenue.", e) 
        }

    }

}