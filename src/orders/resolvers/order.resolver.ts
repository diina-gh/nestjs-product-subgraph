import { Resolver, Mutation, Query, Args, InputType, Int, Info, ResolveReference, ResolveField, Parent } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { InputError } from 'src/_bases/entities/input-error.entity';
import { ServerError } from 'src/_bases/entities/server-error.entity';
import { District } from 'src/_externals/district.entity';
import { User } from 'src/_externals/user.entity';
import { Repository } from 'typeorm';
import { OrderArgs } from '../dto/order.args';
import { OrderInput } from '../dto/order.input';
import { PaginatedOrder, PaginatedOrderResult, Order, OrderResult } from '../entities/order.entity';
import { OrderService } from '../services/order.service';


@Resolver(() => Order)
export class OrderResolver {

    constructor(
        private readonly orderService: OrderService,
        @InjectRepository(Order) private orderRepository: Repository<Order>,
    ) {}

    @ResolveReference()
    resolveReference(reference: { __typename: string; id: number }): Order | any {
        return this.orderService.findOne(reference.id);
    }

    @ResolveField((of) => User)
    user(@Parent() order: Order): any {
      return { __typename: 'User', id: order.userId };
    }

    @ResolveField((of) => District)
    district(@Parent() order: Order): any {
      return { __typename: 'District', id: order.districtId };
    }

    @Query(() => OrderResult, {name: 'order'})
    public async getOne(@Args('id') id: number): Promise<typeof OrderResult> {
        try {
            const order = await this.orderService.findOne(id);
            if (!order) return new InputError("Ce order n'éxiste pas.") 
            return order
        } catch (error) {
            return new ServerError("Une erreur est survenue.", error) 
        };
    }

    @Query(() => PaginatedOrderResult, {name: 'orders'})
    public async getMany(@Args('orderArgs') ordersArgs: OrderArgs, @Info() infos: any): Promise<typeof PaginatedOrderResult> {
        try {
            const orders = await this.orderService.findAll(ordersArgs, infos, 'orders');
            const count  = await this.orderService.count(ordersArgs)
            const hasNext = (count - (++(ordersArgs.page) * ordersArgs.take)) > 0
            return new PaginatedOrder(orders, count, hasNext)
        } catch (error) {
            return new ServerError("Une erreur est survenue.", error) 
        }
    }

    @Mutation(() => OrderResult, { name: 'saveOrder' })
    public async upsert(@Args('orderInput') orderInput: OrderInput): Promise<typeof OrderResult> {
        try {
            if(orderInput.id){
                const updated = await this.orderService.update(orderInput.id, orderInput)
                if(updated) return await this.orderService.findOne(orderInput.id)
                else return new InputError("Ce order n'éxiste pas.")
            } 
    
            let entity = this.orderRepository.create(orderInput);
            return await this.orderService.create(entity);
        } 
        catch (e) {
            return new ServerError("Une erreur est survenue.", e) 
        }
    }

    @Mutation(() => OrderResult, { name: 'deleteOrder' })
    public async delete(@Args('id', { type: () => Int }) id: number): Promise<typeof OrderResult>  {
        try {
            const item = await this.orderService.findOne(id)
            if(item) await this.orderService.delete(id)
            else return new InputError("Ce order n'éxiste pas.")
            return item
        } 
        catch (e) {
            return new ServerError("Une erreur est survenue.", e) 
        }

    }

}