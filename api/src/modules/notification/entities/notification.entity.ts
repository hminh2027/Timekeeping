import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  content!: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  authorId!: number;

  @Column()
  url: string;

  // TODO: make it an array
  @Column({ default: false })
  isRead: boolean;

  /* RELATIONSHIPS */
  /* N-1 */
  @ManyToOne(() => User, (user) => user.notifications, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'authorId' })
  author: User;

  /* N-N */
  @ManyToMany(() => User)
  @JoinTable()
  recipients: User[];
}
