import { DataSource } from 'typeorm';

export const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '85273200',
  database: 'companycheckin',
  logging: true,
  synchronize: true,
  // entities: [__dirname + '/../module/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/**/*.migration{.ts,.js}'],
});
