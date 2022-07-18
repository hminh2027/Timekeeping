import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  /* RELATIONSHIPS */
  /* 1-N */
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
