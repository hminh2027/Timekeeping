import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  title!: string;

  @Column({ length: 255 })
  content!: string;

  @Column()
  startDate!: Date;

  @Column()
  endDate!: Date;

  @Column()
  recipientId!: number;

  @Column()
  authorId!: number;

  @Column()
  ticketType!: string;

  @Column()
  ticketStatus!: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /* RELATIONSHIPS */
  /* N-1 */
  @ManyToOne(() => User, (user) => user.tickets, { eager: true })
  @JoinColumn({ name: 'authorId', referencedColumnName: 'id' })
  author: User;

  @ManyToOne(() => User, (user) => user.tickets, { eager: true })
  @JoinColumn({ name: 'recipientId', referencedColumnName: 'id' })
  recipient: User;
}
