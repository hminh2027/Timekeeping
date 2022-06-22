import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 50,
        unique: true
    })
    email: string;
    
    @Column("varchar", { length: 50 })
    password: string;

    @Column("nvarchar", { length: 50 })
    firstName: string;

    @Column("nvarchar", { length: 50 })
    lastName: string;

    @Column({ default: 0 })
    gender: boolean;

    @Column("varchar", { length: 50 })
    birth: string;

    @Column("varchar", { length: 20 })
    phone: string;

    @Column("varchar", { length: 50 })
    skype: string;

    @Column("nvarchar", { length: 100 })
    address: string;

    @Column("varchar", { length: 50 })
    avatar: string;

    @CreateDateColumn ({ default: 0 })
    createdAt: string;

    @UpdateDateColumn ({ default: 0 })
    modifiedAt: string;

    @Column({ default: 0 })
    isDeleted: boolean;
}