import { User } from 'src/modules/user/user.entity';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
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
      });

      return dataSource.initialize();
    },
  },
];