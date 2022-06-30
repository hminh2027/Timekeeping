import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Role } from '../role/role.entity';
import { Ticket } from '../ticket/entity/ticket.entity';

import { PasswordTransformer } from './password.transformer';

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

  @Column({
    name: 'password',
    length: 255,
    // transformer: new PasswordTransformer(),
  })
  // @Exclude()
  password!: string;

  @Column()
  roleId: number;

  /* N-1 relationships */
  @ManyToOne(() => Role, role => role.users, { eager: true })
  role: Role;

  /* N-1 relationships */
  @OneToMany(() => Ticket, ticket => ticket.id)
  tickets: Ticket[];
}

export class UserFillableFields {
  email!: string;
  firstName!: string;
  lastName!: string;
  password!: string;
}
