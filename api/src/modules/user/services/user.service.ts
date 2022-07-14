import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { User, UserFillableFields } from '../entities/user.entity';
import { UserPayload } from '../payload/user.payload';
import { UserRepository } from '../repositories/user.repository';
import { UserRole } from '../enums/role.enum';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async getByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async getByEmailAndPass(email: string, password: string) {
    return await this.userRepository.findOne({ where: { email, password } });
  }

  async getByResetToken(token: string) {
    return await this.userRepository.findOne({ where: { resetToken: token } });
  }

  async getAdmin() {
    return await this.userRepository.find({ where: { role: UserRole.ADMIN } });
  }

  async create(payload: UserFillableFields): Promise<User> {
    const checkEmailExistence = await this.userRepository.checkEmailExistence(
      payload.email,
    );

    if (checkEmailExistence) {
      throw new NotAcceptableException(
        'Another user with provided email already exists.',
      );
    }

    const newUser = await this.userRepository.create(payload);
    return await this.userRepository.save(newUser);
  }

  async updateToken(id: number, token: string): Promise<void> {
    const checkUserExistence = await this.userRepository.checkUserExistence(id);

    if (!checkUserExistence) {
      throw new NotAcceptableException('User does not exists.');
    }

    await this.userRepository.update(id, { resetToken: token });
  }

  async updatePassword(id: number, password: string): Promise<void> {
    const checkUserExistence = await this.userRepository.checkUserExistence(id);

    if (!checkUserExistence) {
      throw new NotAcceptableException('User does not exists.');
    }
    const passHashed = this.userRepository.hashPassword(password);
    await this.userRepository.update(id, { password: passHashed });
  }

  async update(id: number, payload: UserPayload): Promise<User> {
    const checkUserExistence = await this.userRepository.checkUserExistence(id);

    if (!checkUserExistence) {
      throw new NotAcceptableException('User does not exists.');
    }

    // const checkEmailExistence = await this.userRepository.checkEmailExistence(
    //   payload.email,
    //   id,
    // );

    // if (checkEmailExistence) {
    //   throw new NotAcceptableException(
    //     'Another user with provided email already exists.',
    //   );
    // }

    const userUpdate = await this.userRepository.create({
      id,
      ...payload,
    });

    return await this.userRepository.save(userUpdate);
  }

  async getRole(): Promise<string[]> {
    return Object.values(UserRole);
  }

  async search(params): Promise<User[]> {
    const offset = (params.page - 1) * params.limit;
    let users: User[];

    users = await this.userRepository
      .createQueryBuilder('users')
      .where('users.email like :email', {
        email: `%${params.textSearch || ' '}%`,
      })
      .orderBy('users.id', 'DESC')
      .skip(offset)
      .take(params.limit)
      .execute();

    return users;
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  public async checkUserRole(id: number, role: UserRole): Promise<boolean> {
    const user = await this.getById(id);
    if (!user) throw new NotFoundException('User not found!');
    return user.role === role;
  }
}
