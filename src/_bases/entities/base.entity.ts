import { Field, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, BaseEntity,} from 'typeorm';
  
@ObjectType('Base')
export abstract class BaseModel extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Field()
    @Column({ length: 200, nullable:true })
    name: string;

    @Field()
    @Column({ length: 1000, nullable: true })
    desc: string;

    @Field()
    @Column({ name:'activated' ,type: 'boolean', default: true })
    activated: boolean;

    @Field()
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @Field()
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

}
  