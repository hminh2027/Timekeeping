import { User } from '../modules/user/entities/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1657996143513 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'insert into `users` values (1, "minh", "vu", "abc@vdtsol.com", "admin","Vcheck1@", "")',
    );
    // const productRepo = queryRunner.connection.getRepository(User);
    // console.log('UP!!!');
    // console.log('repo', productRepo);
    // await productRepo.insert([
    //   {
    //     id: 1,
    //     firstName: 'Product 1',
    //     lastName: 'Description product',
    //     email: 'description@vdtsol.com',
    //     password: 'Vcheck1@',
    //   },
    // ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
