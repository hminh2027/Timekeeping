import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('login_histories')
export class LoginHistory {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 355 })
    accessToken!: string;

    @Column({ length: 255 })
    ipAddress!: string;

    @Column({ length: 255 })
    browser!: string;

    @Column({ length: 255 })
    device!: string;

    @CreateDateColumn()
    createdAt: Date;

    // @Column()
    // checkinId!: number;

    // /* RELATIONSHIPS */
    // /* N-1 */
    // @ManyToOne(() => Checkin, checkin => checkin.checkout_histories, { eager: true })
    // @JoinColumn({ name: 'checkinId'})
    // checkin: Checkin;  
}