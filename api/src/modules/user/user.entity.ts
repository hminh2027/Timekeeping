import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../role/role.entity";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50, unique: true })
    email: string;
    
    @Column({ length: 150 })
    password: string;

    @Column({ length: 50 })
    firstName: string;

    @Column({ length: 50 })
    lastName: string;

    @Column({ default: false })
    gender: boolean;

    @Column({ length: 50, default: '' })
    birth: string;

    @Column({ length: 50, default: ''  })
    avatar: string;

    @CreateDateColumn ()
    createdAt: Date;

    @UpdateDateColumn ()
    modifiedAt: Date;

    @Column({ default: false })
    isDeleted: boolean;

    @ManyToOne(() => Role, role => role.users, { eager: true })
    role: Role;
}