import { Role } from 'src/modules/role/entities/role.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1658113003560 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const role1 = await queryRunner.manager.create<Role>(Role, {
      name: 'admin',
    });

    const role2 = await queryRunner.manager.create<Role>(Role, {
      name: 'user',
    });

    await queryRunner.manager.save(role1);
    await queryRunner.manager.save(role2);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE * FROM roles`);
  }
}
