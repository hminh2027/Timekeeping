import { User } from "src/modules/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('checkins')
export class Checkin {
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
    @ManyToOne(() => User, user => user.checkins, { eager: true })
    @JoinColumn({ name: 'userId'})
    user: User;  
}