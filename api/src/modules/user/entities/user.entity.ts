import { createHmac } from 'crypto';
import { Notification } from 'src/modules/notification/entities/notification.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Checkin } from '../../checkin/entities/checkinout.entity';
import { LoginHistory } from '../../login-history/entities/login-history.entity';
import { Ticket } from '../../ticket/entities/ticket.entity';
import { UserRole } from '../enums/role.enum';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  firstName!: string;

  @Column({ length: 255 })
  lastName!: string;

  @Column({ length: 255 })
  email!: string;

  @Column({ length: 255, select: false })
  password!: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role!: UserRole;

  @Column({ length: 355, select: false })
  resetToken: string;

  @Column({
    length: 355,
    default:
      'https://res.cloudinary.com/minh2027/image/upload/v1630167071/Avatar/default-user_eic6ct.png',
  })
  avatar: string;

  @Column({ length: 255, default: '' })
  address?: string;

  @Column({ length: 255, default: '' })
  skype?: string;

  @Column({ length: 255, default: '' })
  facebook?: string;

  @Column({ length: 255, default: '' })
  phone?: string;

  @CreateDateColumn()
  createdAt: Date;

  /* 1-N */
  @OneToMany(() => Ticket, (ticket) => ticket.id, { cascade: true })
  tickets: Ticket[];

  @OneToMany(() => Checkin, (checkin) => checkin.user, { cascade: true })
  checkins: Checkin[];

  @OneToMany(() => Notification, (noti) => noti.author, { cascade: true })
  notifications: Notification[];

  @OneToMany(() => LoginHistory, (loginHistory) => loginHistory.id, {
    cascade: true,
  })
  loginHistories: LoginHistory[];

  @BeforeInsert()
  async setPassword(password: string | undefined): Promise<void> {
    this.password = createHmac('sha256', password || this.password).digest(
      'hex',
    );
  }
}

export class UserFillableFields {
  email!: string;
  firstName!: string;
  lastName!: string;
  password!: string;
}
