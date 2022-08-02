import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Checkin } from './checkinout.entity';

@Entity('checkout_histories')
export class CheckoutHistory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255, default: '' })
  image!: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  checkinId!: number;

  /* RELATIONSHIPS */
  /* N-1 */
  @ManyToOne(() => Checkin, (checkin) => checkin.checkout_histories, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'checkinId' })
  checkin: Checkin;
}
