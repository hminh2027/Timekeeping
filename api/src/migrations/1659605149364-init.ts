import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1659605149364 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'alter table `notifications` rename column userId to authorId',
    );
    await queryRunner.query(
      'alter table `users` add column avatar varchar(355) default "https://res.cloudinary.com/minh2027/image/upload/v1630167071/Avatar/default-user_eic6ct.png"',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
