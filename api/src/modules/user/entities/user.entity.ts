import { createHmac } from 'crypto';
import { Notification } from 'src/modules/notification/entities/notification.entity';
// import { Role } from 'src/modules/role/entities/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
  CreateDateColumn,
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

  /* 1-N */
  @OneToMany(() => Ticket, (ticket) => ticket.id)
  tickets: Ticket[];

  @OneToMany(() => Checkin, (checkin) => checkin.user)
  checkins: Checkin[];

  @OneToMany(() => Notification, (noti) => noti.user)
  notifications: Notification[];

  @OneToMany(() => LoginHistory, (loginHistory) => loginHistory.id)
  loginHistories: LoginHistory[];

  @CreateDateColumn()
  createdAt: Date;

  @BeforeInsert()
  async setPassword(password: string | undefined): Promise<void> {
    const passHashed = createHmac('sha256', password || this.password).digest(
      'hex',
    );
    this.password = passHashed;
  }
}

export class UserFillableFields {
  email!: string;
  firstName!: string;
  lastName!: string;
  password!: string;
}
