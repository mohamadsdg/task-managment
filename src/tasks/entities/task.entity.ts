import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TaskStatus } from "../task.model";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    description:string;

    @Column({enum:TaskStatus,default:TaskStatus.OPEN})
    status:TaskStatus

    @CreateDateColumn({ name: 'created_at' })
    'created_at': Date;
    @UpdateDateColumn({ name: 'updated_at' })
    'updated_at': Date;
}