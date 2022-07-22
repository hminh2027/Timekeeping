import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1658393582973 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `checkout_histories` ADD COLUMN image VARCHAR(255) DEFAULT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `checkout_histories` DROP COLUMN "image"',
    );
  }
}
