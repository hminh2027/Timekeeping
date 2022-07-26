import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1658799239565 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'alter table `users` add column createdAt datetime(6)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
