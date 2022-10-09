import { BaseEntity, Brackets, Repository } from "typeorm";
import { PrismaSelect } from '@paljs/plugins';

export abstract class BaseService<T extends BaseEntity> {

    private baseRepository: Repository<T>;

    protected constructor(repository: Repository<T>) {
      this.baseRepository = repository;
    }

    public async findAll(itemArgs: any, infos: any, target: string): Promise<T[]> {

        const { page, take, filter, orderBy } = itemArgs;

        const orderProp = Object.keys(orderBy)[0]
        const selectedFields = new PrismaSelect(infos).valueOf('users');


        console.log("The selected fields are => ", selectedFields)

        let query = this.baseRepository.createQueryBuilder(target)

        Object.keys(filter).map((item: any, index: number) => {
            if(item != 'search') query.andWhere(`${target + '.' + item} = :${item}`, { [item]: filter[Object.keys(filter)[index]] });  
        });

        if(filter?.search?.searchQuery?.length > 1){
            query.andWhere(new Brackets(qb => {      
                filter?.search?.searchBy?.map((item:string) => {
                    qb.orWhere(`${target + '.' + item} like :query`, { query: `%${filter?.search?.searchQuery}%`})
                })                                                         
            }))
        }
    
        // query.addSelect(selectedFields)
        query.addOrderBy(`${target}.${orderProp}`, orderBy[orderProp] == 1 ? 'DESC' : 'ASC')
        query.take(take)
        query.skip((page - 1) * take)
    
        return query.getMany();
        
    }

    public async findOne(id: number): Promise<T> {

        let query = { where: { id } } as any;
        return await this.baseRepository.findOne(query) || null;
    
    }

    public async findAndCount(itemArgs: any): Promise<any> {
        const { page, take } = itemArgs;
        return await this.baseRepository.findAndCount({where:{}, skip: page, take: take })
    }

    public async count(args: any): Promise<number> {
        return await this.baseRepository.count(args)
    }

    public async create(item: T): Promise<T> {
        return await this.baseRepository.save(item);
    }

    public async update(critere: any, item: any): Promise<boolean>  {
        const updateResult =  await this.baseRepository.update(critere, item);
        if(updateResult.affected > 0) return true
        return false
    }

    public async delete(id: number): Promise<boolean> {
        const deleteResult =  await this.baseRepository.delete(id);
        if(deleteResult.affected > 0) return true
        return false
    }

    public async changeStatus(id: number): Promise<any> {
        const query = { where: { id } } as any
        const found = await this.baseRepository.findOne(query);
        if (found) {
          const state = { activated: !found['activated'] } as any
          return await this.update(id, state)
        }
        return null;
    }

}