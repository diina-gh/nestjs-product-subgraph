import { Resolver, Mutation, Query, Args, InputType, Int, Info, ResolveReference } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { InputError } from 'src/_bases/entities/input-error.entity';
import { ServerError } from 'src/_bases/entities/server-error.entity';
import { Repository } from 'typeorm';
import { OptionArgs } from '../dto/option.args';
import { OptionInput } from '../dto/option.input';
import { PaginatedOption, PaginatedOptionResult, Option, OptionResult } from '../entities/option.entity';
import { OptionService } from '../services/option.service';


@Resolver(() => Option)
export class OptionResolver {

    constructor(
        private readonly optionService: OptionService,
        @InjectRepository(Option) private optionRepository: Repository<Option>,
    ) {}

    @ResolveReference()
    resolveReference(reference: { __typename: string; id: number }): Option | any {
        return this.optionService.findOne(reference.id);
    }

    @Query(() => OptionResult, {name: 'option'})
    public async getOne(@Args('id') id: number): Promise<typeof OptionResult> {
        try {
            const option = await this.optionService.findOne(id);
            if (!option) return new InputError("Ce option n'éxiste pas.") 
            return option
        } catch (error) {
            return new ServerError("Une erreur est survenue.", error) 
        };
    }

    @Query(() => PaginatedOptionResult, {name: 'options'})
    public async getMany(@Args('optionArgs') optionsArgs: OptionArgs, @Info() infos: any): Promise<typeof PaginatedOptionResult> {
        try {
            const options = await this.optionService.findAll(optionsArgs, infos, 'options');
            const count  = await this.optionService.count(optionsArgs)
            const hasNext = (count - (++(optionsArgs.page) * optionsArgs.take)) > 0
            return new PaginatedOption(options, count, hasNext)
        } catch (error) {
            return new ServerError("Une erreur est survenue.", error) 
        }
    }

    @Mutation(() => OptionResult, { name: 'saveOption' })
    public async upsert(@Args('optionInput') optionInput: OptionInput): Promise<typeof OptionResult> {
        try {
            if(optionInput.id){
                const updated = await this.optionService.update(optionInput.id, optionInput)
                if(updated) return await this.optionService.findOne(optionInput.id)
                else return new InputError("Cette option n'éxiste pas.")
            } 
    
            let entity = this.optionRepository.create(optionInput);
            return await this.optionService.create(entity);
        } 
        catch (e) {
            return new ServerError("Une erreur est survenue.", e) 
        }
    }

    @Mutation(() => OptionResult, { name: 'deleteOption' })
    public async delete(@Args('id', { type: () => Int }) id: number): Promise<typeof OptionResult>  {
        try {
            const item = await this.optionService.findOne(id)
            if(item) await this.optionService.delete(id)
            else return new InputError("Cette option n'éxiste pas.")
            return item
        } 
        catch (e) {
            return new ServerError("Une erreur est survenue.", e) 
        }

    }

}