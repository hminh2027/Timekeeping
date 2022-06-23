import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { hash } from "bcrypt";
import { Repository } from "typeorm";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>
    ) {}

    async findAll(): Promise<User[]> {
        try {
            return await this.userRepository.find();

        } catch (err) {
            throw err;
        }
    }

    async findOneByEmail(email): Promise<User> {
        try {
            return await this.userRepository.findOne({ where: {email} });

        } catch (err) {
            throw err;
        }
    }

    async findOneById(id): Promise<User> {
        try {
            return await this.userRepository.findOne({ where: {id} });

        } catch (err) {
            throw err;
        }
    }

    async create(data: CreateUserDto): Promise<void> {
        try {
            // Destructuring data object
            const { email, password, firstName, lastName, gender, birth, phone, skype, address, avatar } = data
            // Check if email exist
            const emailCheck = await this.findOneByEmail(data.email);
            if (emailCheck) throw new HttpException(`${data.email} is already registerd on this site`, HttpStatus.CONFLICT);
            // Hash password
            const hashedPassword = await hash(password, 10)
            // Insert query
            await this.userRepository
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({
                email,
                password: hashedPassword,
                firstName,
                lastName,
                gender,
                birth,
                phone,
                skype,
                address,
                avatar
            })
            .execute();

        } catch (err) {
            throw err;
        }
    }

    async update(id: number, data: UpdateUserDto): Promise<User> {
        try {
            // Destructuring data
            const { email, password, firstName, lastName, gender, birth, phone, skype, address, avatar } = data;
            // Check if user exist
            const userCheck = await this.findOneById(id);
            if (!userCheck) throw new NotFoundException('User is not found');
            // Check if email exist
            const emailCheck = await this.findOneById(id);
            if (emailCheck) throw new HttpException(`${data.email} is already registerd on this site`, HttpStatus.CONFLICT);
            // Hash password
            const hashedPassword = await hash(password, 10);
            // Update query
            await this.userRepository
            .createQueryBuilder()
            .update()
            .set({
                email,
                password: hashedPassword,
                firstName,
                lastName,
                gender,
                birth,
                phone,
                skype,
                address,
                avatar
            })
            .where('id = :id', { id })
            .execute();
            // Return the updated user
            return await this.userRepository
            .createQueryBuilder()
            .where('id = :id', { id })
            .getOne();

        } catch (err) {
            throw err;
        }
        
    }

    async remove(id: number): Promise<void> {
        try {
            await this.userRepository.delete(id);

        } catch (err) {
            throw err;
        }
    }
}