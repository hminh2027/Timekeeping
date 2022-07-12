import { createHmac } from 'crypto';
import { EntityRepository } from 'src/common/typeorm/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async checkEmailExistence(
    email: string,
    id?: number,
  ): Promise<boolean> {
    let count;

    if (id) {
      count = await this.createQueryBuilder('users')
        .where('users.email = :email', { email })
        .andWhere('users.id <> :id', { id })
        .getCount();
    } else {
      count = await this.createQueryBuilder('users')
        .where('users.email = :email', { email })
        .getCount();
    }

    return count > 0;
  }

  public async checkUserExistence(id: number): Promise<boolean> {
    const count = await this.createQueryBuilder('users')
      .where('users.id = :id', { id })
      .getCount();

    return count > 0;
  }

  public hashPassword(password: string): string {
    return createHmac('sha256', password).digest('hex');
  }
}
