import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity('contacts')
export class Contact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    address: string;
    
    @Column({ length: 255 })
    skype: string;

    @Column({ length: 255 })
    phone: string;
   
    /* 1-1 relationships */
    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}