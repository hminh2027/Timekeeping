import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";
import { Role } from "../role/role.entity";
import { Ticket } from "../ticket/ticket.entity";

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

    @Column()
    birth: Date;

    @Column({ length: 50, default: ''  })
    avatar: string;

    @CreateDateColumn ()
    createdAt: Date;

    @UpdateDateColumn ()
    modifiedAt: Date;

    @Column({ default: false })
    isDeleted: boolean;

    @ManyToOne(() => Role, role => role.users, { eager: true })
    @JoinColumn({ name: 'roleId', referencedColumnName: 'id'})
    role: Role;

    @RelationId((user: User) => user.role)
    roleId: number;

    @OneToMany(() => Ticket, ticket => ticket.id)
    tickets: Ticket[];
    
}