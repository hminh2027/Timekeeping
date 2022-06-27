import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { hash } from "bcrypt";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from './user.entity';
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository
    ) {}

    async search(text: string, limit: number, page: number): Promise<User[]>{
        try {
            limit = limit || 5;
            page = page || 1;
            text = text || '';
            const offset = (page - 1) * limit;
            let users: User[];

            if(text) {               
                users = await this.userRepository
                .createQueryBuilder('user')
                .where('user.email like :email', { email: `%${text}%` })
                .orderBy('user.createdAt', 'DESC')
                .skip(offset)
                .take(limit)
                .getMany();

            }
            else {
                users = await this.userRepository
                .createQueryBuilder('user')
                .orderBy('user.createdAt', 'DESC')
                .skip(offset)
                .take(limit)
                .getMany();
            }
            
            return users;

        } catch (err) {
            throw err;
        }
    }

    async findOneByEmail(email: string): Promise<User> {
        try {
            return await this.userRepository.findOne({ where: {email} });

        } catch (err) {
            throw err;
        }
    }

    async findOneById(id: number): Promise<User> {
        try {
            return await this.userRepository.findOne({ where: {id} });

        } catch (err) {
            throw err;
        }
    }

    async create(data: CreateUserDto): Promise<User> {
        try {
            // Check if email exist
            const emailCheck = await this.userRepository.checkIfEmailExists(data.email);
            if (emailCheck) throw new HttpException(`${data.email} is already registerd on this site`, HttpStatus.CONFLICT);
            
            // Hash password
            const hashedPassword = await hash(data.password, 10);
            data.password = hashedPassword;

            // Insert query
            const newUser = await this.userRepository.create(data);
            return this.userRepository.save(newUser);

        } catch (err) {
            throw err;
        }
    }

    async update(id: number, data: UpdateUserDto): Promise<void> {
        try {
            // Check if user exist
            const userCheck = await this.userRepository.checkIfUserExists(id);
            if (!userCheck) throw new NotFoundException('User is not found');
            
            // Check if email exist
            const emailCheck = await this.userRepository.checkIfEmailExists(data.email, id);
            if (emailCheck) throw new HttpException(`${data.email} is already registerd on this site`, HttpStatus.CONFLICT);
            
            // Update query
            await this.userRepository.update(id, data);

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