import { BaseEntity, Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TaskStatus } from "../task.model";

@Entity()
export class Task extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @Generated("uuid")
    uuid: string;

    @Column()
    title:string;

    @Column()
    description:string;

    @Column({type:'enum',enum:TaskStatus,default:TaskStatus.OPEN})
    status:TaskStatus

    @CreateDateColumn({ name: 'created_at' })
    'created_at': Date;

    @UpdateDateColumn({ name: 'updated_at' })
    'updated_at': Date;
}