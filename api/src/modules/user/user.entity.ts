import { createHmac } from 'crypto';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
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

  @Column({ length: 255, select: false })
  password!: string;

  @Column({ length: 255 })
  role!: string;

  @Column( {length: 355, select: false })
  resetToken: string

  /* RELATIONSHIPS */
  /* 1-N */
  @OneToMany(() => Ticket, ticket => ticket.id)
  tickets: Ticket[];

  @OneToMany(() => Checkin, checkin => checkin.user)
  checkins: Checkin[];

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword(password: string): Promise<void> {
    const passHash = createHmac('sha256', password || this.password).digest('hex');
    this.password = passHash;
  }

}

export class UserFillableFields {
  email!: string;
  firstName!: string;
  lastName!: string;
  password!: string;
}
