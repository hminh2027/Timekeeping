import { User } from "src/modules/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CheckoutHistory } from "./checkout-history.entity";

@Entity('checkins')
export class Checkin {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 255 })
    checkinImage!: string;

    @Column({ length: 255, default: '' })
    checkoutImage!: string ;

    @Column({ length: 255 })
    checkinLongitude!: string;

    @Column({ length: 255 })
    checkinLatitude!: string;

    @Column({ length: 255, default: '' })
    checkoutLongitude!: string;

    @Column({ length: 255, default: '' })
    checkoutLatitude!: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    userId!: number;

    /* RELATIONSHIPS */
    /* N-1 */
    @ManyToOne(() => User, user => user.checkins, { eager: true })
    @JoinColumn({ name: 'userId'})
    user: User;

    /* 1-N */
    @OneToMany(() => CheckoutHistory, checkout => checkout.checkin)
    checkout_histories: CheckoutHistory;  
}