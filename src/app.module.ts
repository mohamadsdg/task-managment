import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './tasks/config/orm.config';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule,TypeOrmModule.forRoot(typeOrmConfig)],
})
export class AppModule {}
