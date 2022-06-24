import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { hash } from "bcrypt";
import { Repository } from "typeorm";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async findAll(): Promise<User[]> {
        try {
            return await this.userRepository.find();

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
            const emailCheck = await this.checkIfEmailExists(data.email);
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
            const userCheck = await this.checkIfUserExists(id);
            if (!userCheck) throw new NotFoundException('User is not found');
            
            // Check if email exist
            const emailCheck = await this.checkIfEmailExists(data.email, id);
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

    async checkIfEmailExists(email: string, id?: number): Promise<boolean> {
        const andQuery = `and id <> ?`
        const query = `SELECT EXISTS (SELECT * FROM user WHERE email = ? ${id ? andQuery : ''}) AS result;`;

        const [{result}] = await this.userRepository.query(query, [email, id]);
        return result > 0;
    }

    async checkIfUserExists(id: number): Promise<boolean> {
        const query = `SELECT EXISTS (SELECT * FROM user WHERE id = ?) AS result;`;
        const [{result}] = await this.userRepository.query(query, [id]);
        return result > 0;
    }
}