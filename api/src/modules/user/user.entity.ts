import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Checkin } from '../checkin/checkin.entity';
import { Checkout } from '../checkout/checkout.entity';
import { Role } from '../role/role.entity';
import { Ticket } from '../ticket/entities/ticket.entity';

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

  @Column()
  roleId: number;

  /* RELATIONSHIPS */
  /* N-1 */
  @ManyToOne(() => Role, role => role.users, { eager: true })
  @JoinColumn({ name: 'roleId'})
  role: Role;

  /* 1-N */
  @OneToMany(() => Ticket, ticket => ticket.id)
  tickets: Ticket[];

  @OneToMany(() => Checkin, checkin => checkin.user)
  checkins: Checkin[];

  @OneToMany(() => Checkout, checkout => checkout.user)
  checkouts: Checkout[];
}

export class UserFillableFields {
  email!: string;
  firstName!: string;
  lastName!: string;
  password!: string;
}
