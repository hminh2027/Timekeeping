// import { Global, Module } from '@nestjs/common';
// import { databaseProviders } from './database.providers';
// @Global()
// @Module({
//   providers: [...databaseProviders],
//   exports: [...databaseProviders],
// })

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { User } from 'src/modules/user/user.entity';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        // __dirname + '/../**/*.entity{.ts,.js}',
        User
      ],
      synchronize: true,
    }),
  ],
})

export class DatabaseModule {}