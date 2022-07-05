import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Checkin } from '../checkin/entities/checkinout.entity';
import { Ticket } from '../ticket/ticket.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  firstName!: string;

  @Column({ length: 255 })
  lastName!: string;

  @Column({ length: 255 })
  email!: string;

  @Column({ length: 255 })
  password!: string;

  @Column({ length: 255 })
  role!: string;

  /* RELATIONSHIPS */
  /* 1-N */
  @OneToMany(() => Ticket, ticket => ticket.id)
  tickets: Ticket[];

  @OneToMany(() => Checkin, checkin => checkin.user)
  checkins: Checkin[];
}

export class UserFillableFields {
  email!: string;
  firstName!: string;
  lastName!: string;
  password!: string;
}
