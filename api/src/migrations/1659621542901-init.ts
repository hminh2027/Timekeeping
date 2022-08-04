import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1659621542901 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'alter table `users` add column address varchar(255) NULL default "" ',
    );
    await queryRunner.query(
      'alter table `users` add column facebook varchar(255) NULL default ""',
    );
    await queryRunner.query(
      'alter table `users` add column skype varchar(255) NULL default ""',
    );
    await queryRunner.query(
      'alter table `users` add column phone varchar(255) NULL default ""',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
