import {TypeOrmModuleOptions} from "@nestjs/typeorm";

export const typeOrmConfig:TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username:'admin',
    password:'pass123',
    database:'taskmanagment',
    // entities: [__dirname +'../**/*.entity.ts'],
    entities: ['dist/**/*.entity.js'],
    autoLoadEntities:true,
    synchronize:true
}