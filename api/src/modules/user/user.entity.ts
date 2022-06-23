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
    
    @Column("varchar", { length: 100 })
    password: string;

    @Column("nvarchar", { length: 50 })
    firstName: string;

    @Column("nvarchar", { length: 50 })
    lastName: string;

    @Column("bool", { default: false })
    gender: boolean;

    @Column("varchar", { length: 50, default: '' })
    birth: string;

    @Column("varchar", { length: 50, default: ''  })
    avatar: string;

    @CreateDateColumn ()
    createdAt: string;

    @UpdateDateColumn ()
    modifiedAt: string;

    @Column("bool", { default: false })
    isDeleted: boolean;
}