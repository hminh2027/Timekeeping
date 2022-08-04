import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/entities/user.entity';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  address?: string;

  @Column({ length: 255 })
  skype?: string;

  @Column({ length: 255 })
  facebook?: string;

  @Column({ length: 255 })
  phone?: string;

  /* 1-1 */
  @OneToOne(() => User, (user) => user.contact, { onDelete: 'CASCADE' })
  user: User;
}
