import { User } from 'src/modules/user/entities/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1658113004560 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const admin = await queryRunner.manager.create<User>(User, {
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@vdtsol.com',
      password: 'Vcheck1@',
      roleId: 1,
      resetToken: '',
    });
    await queryRunner.manager.save(admin);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
