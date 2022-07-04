import { User } from "src/modules/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('checkouts')
export class Checkout {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    image: string;

    @Column({ length: 255 })
    longitude: string;

    @Column({ length: 255 })
    latitude: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    userId: number;

    /* RELATIONSHIPS */
    /* N-1 */
    @ManyToOne(() => User, user => user.checkouts, { eager: true })
    @JoinColumn({ name: 'userId'})
    user: User;  
}