import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { User, UserFillableFields } from '../entities/user.entity';
import { UserPayload } from '../payload/user.payload';
import { UserRepository } from '../repositories/user.repository';
import { UserRole } from '../enums/role.enum';
import { SearchQueryDto } from '../dto/search.dto';
// import { CheckinService } from '../../checkin/services/checkinout.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) // private readonly checkinService: CheckinService,
  {}

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
    return await this.userRepository.find({
      where: { role: UserRole.ADMIN },
    });
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

    const userUpdate = await this.userRepository.create({
      id,
      ...payload,
    });

    return await this.userRepository.save(userUpdate);
  }

  async search(params: SearchQueryDto): Promise<User[]> {
    return await this.userRepository.pagination(params);
  }

  async remove(id: number): Promise<void> {
    // await this.checkinService;
    await this.userRepository.delete(id);
  }

  public async checkUserRole(id: number, role: UserRole): Promise<boolean> {
    const user = await this.getById(id);
    if (!user) throw new NotFoundException('User not found!');
    return user.role === role;
  }
}
