import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('login_histories')
export class LoginHistory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 355 })
  refreshToken!: string;

  @Column({ length: 255 })
  ipAddress!: string;

  @Column({ length: 255 })
  browser!: string;

  @Column({ length: 255 })
  device!: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  expiredAt: Date;

  @Column()
  userId!: number;

  /* RELATIONSHIPS */
  /* N-1 */
  @ManyToOne(() => User, (user) => user.loginHistories, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @BeforeInsert()
  async setExpiration(): Promise<void> {
    // đang bị fix cứng
    this.expiredAt = new Date(+this.createdAt + 3 * 60 * 60 * 1000);
  }
}
