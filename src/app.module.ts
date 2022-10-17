import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER } from './_commons/dotenv';
import { GraphQLModule } from '@nestjs/graphql';
import {ApolloFederationDriver, ApolloFederationDriverConfig,} from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';
import { MenuModule } from './menus/menu.module';
import { CategoryModule } from './categories/category.module';
import { InventoryModule } from './inventories/inventory.module';
import { DiscountModule } from './discounts/discount.module';
import { CartModule } from './carts/cart.module';
import { CartItemModule } from './cart-items/cart-item.module';
import { OrderModule } from './orders/order.module';
import { OrderItemModule } from './order-items/order-item.module';
import { VariantModule } from './variants/variant.module';
import { OptionModule } from './options/option.module';
import { MenuVariantModule } from './menus-variants/menu-variant.module';
import { MenuOptionModule } from './menus-options/menu-option.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      username: DATABASE_USER,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
      logging: true
    } as TypeOrmModuleOptions),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: join(process.cwd(), 'src/_graphql/schema.gql'),
      debug: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    MenuModule,
    CategoryModule,
    InventoryModule,
    DiscountModule,
    CartModule,
    CartItemModule,
    OrderModule,
    OrderItemModule,
    VariantModule,
    OptionModule,
    MenuVariantModule,
    MenuOptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
