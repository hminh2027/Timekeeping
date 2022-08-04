import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        ({
          type: config.databaseType,
          host: config.databaseHost,
          port: config.databasePort,
          database: config.databaseName,
          username: config.databaseUsername,
          password: config.databasePassword,
          entities: ['src/modules/**/*.entity{.ts,.js}'],
          migrations: ['dist/migrations/**/*{.ts,.js}'],
          cli: {
            migrationsDir: __dirname + '/../migrations',
          },
          migrationsRun: true,
          synchronize: config.isDev,
          logging: !config.isProd,
          useNewUrlParser: true,
        } as TypeOrmModuleOptions),
    }),
  ],
})
// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: 'root',
//   password: '85273200',
//   database: 'companycheckin',
//   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//   migrations: [__dirname + '/../migrations/*{.ts,.js}'],
//   cli: {
//     migrationsDir: __dirname + '/../migrations',
//   },
//   logging: true,
// };
export class DatabaseModule {}
