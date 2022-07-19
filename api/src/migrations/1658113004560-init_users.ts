import { User } from '../modules/user/entities/user.entity';
import { UserRole } from 'src/modules/user/enums/role.enum';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1658113004560 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const admin = await queryRunner.manager.create<User>(User, {
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@vdtsol.com',
      password: 'Vcheck1@',
      role: UserRole.ADMIN,
      resetToken: '',
    });
    await queryRunner.manager.save(admin);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
