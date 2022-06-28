import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity('role')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: String;

    @OneToMany(() => User, user => user.role)
    users: User[];
}