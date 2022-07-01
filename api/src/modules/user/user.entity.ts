import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
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

  /* N-1 relationships */
  @ManyToOne(() => Role, role => role.users, { eager: true })
  @JoinColumn({ name: 'roleId'})
  role: Role;

  /* 1-N relationships */
  @OneToMany(() => Ticket, ticket => ticket.id)
  tickets: Ticket[];
}

export class UserFillableFields {
  email!: string;
  firstName!: string;
  lastName!: string;
  password!: string;
}
