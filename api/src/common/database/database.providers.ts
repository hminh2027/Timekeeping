import { DataSource } from 'typeorm';
require('dotenv').config();

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
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];