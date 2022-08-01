import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1659347131050 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'alter table `checkout_histories` drop column date',
    );
    await queryRunner.query('alter table `checkins` drop column date');
    await queryRunner.query('alter table `checkins` add column date datetime');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
