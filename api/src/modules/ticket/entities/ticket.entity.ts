import { Comment } from 'src/modules/comment/entities/comment.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TicketStatus } from '../enums/ticket-status.enum';
import { TicketType } from '../enums/ticket-type.enum';

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

  @Column({ type: 'enum', enum: TicketType, default: TicketType.SHORT_TERM })
  ticketType!: TicketType;

  @Column({ type: 'enum', enum: TicketStatus, default: TicketStatus.PENDING })
  ticketStatus!: TicketStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /* RELATIONSHIPS */
  /* N-1 */
  @ManyToOne(() => User, (user) => user.tickets, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'authorId' })
  author: User;

  @ManyToOne(() => User, (user) => user.tickets, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'recipientId' })
  recipient: User;

  /* 1-N */
  @OneToMany(() => Comment, (comment) => comment.ticket, { cascade: true })
  comments: Comment;
}
