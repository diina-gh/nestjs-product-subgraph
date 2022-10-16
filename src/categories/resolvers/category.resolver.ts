import { Resolver, Mutation, Query, Args, InputType, Int, Info, ResolveReference } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { InputError } from 'src/_bases/entities/input-error.entity';
import { ServerError } from 'src/_bases/entities/server-error.entity';
import { Repository } from 'typeorm';
import { CategoryArgs } from '../dto/category.args';
import { CategoryInput } from '../dto/category.input';
import { PaginatedCategory, PaginatedCategoryResult, Category, CategoryResult } from '../entities/category.entity';
import { CategoryService } from '../services/category.service';


@Resolver(() => Category)
export class CategoryResolver {

    constructor(
        private readonly categoryService: CategoryService,
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
    ) {}

    @ResolveReference()
    resolveReference(reference: { __typename: string; id: number }): Category | any {
        return this.categoryService.findOne(reference.id);
    }

    @Query(() => CategoryResult, {name: 'category'})
    public async getOne(@Args('id') id: number): Promise<typeof CategoryResult> {
        try {
            const category = await this.categoryService.findOne(id);
            if (!category) return new InputError("Cette catégorie n'éxiste pas.") 
            return category
        } catch (error) {
            return new ServerError("Une erreur est survenue.", error) 
        };
    }

    @Query(() => PaginatedCategoryResult, {name: 'categories'})
    public async getMany(@Args('categoryArgs') categoriesArgs: CategoryArgs, @Info() infos: any): Promise<typeof PaginatedCategoryResult> {
        try {
            const categories = await this.categoryService.findAll(categoriesArgs, infos, 'categories');
            const count  = await this.categoryService.count(categoriesArgs)
            const hasNext = (count - (++(categoriesArgs.page) * categoriesArgs.take)) > 0
            return new PaginatedCategory(categories, count, hasNext)
        } catch (error) {
            return new ServerError("Une erreur est survenue.", error) 
        }
    }

    @Mutation(() => CategoryResult, { name: 'saveCategory' })
    public async upsert(@Args('categoryInput') categoryInput: CategoryInput): Promise<typeof CategoryResult> {
        try {
            if(categoryInput.id){
                const updated = await this.categoryService.update(categoryInput.id, categoryInput)
                if(updated) return await this.categoryService.findOne(categoryInput.id)
                else return new InputError("Cette catégorie n'éxiste pas.")
            } 
    
            let entity = this.categoryRepository.create(categoryInput);
            return await this.categoryService.create(entity);
        } 
        catch (e) {
            return new ServerError("Une erreur est survenue.", e) 
        }
    }

    @Mutation(() => CategoryResult, { name: 'deleteCategory' })
    public async delete(@Args('id', { type: () => Int }) id: number): Promise<typeof CategoryResult>  {
        try {
            const item = await this.categoryService.findOne(id)
            if(item) await this.categoryService.delete(id)
            else return new InputError("Cette catégorie n'éxiste pas.")
            return item
        } 
        catch (e) {
            return new ServerError("Une erreur est survenue.", e) 
        }

    }

}