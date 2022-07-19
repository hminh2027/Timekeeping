import { Repository } from 'typeorm';
import { EntityRepository } from 'src/common/typeorm/typeorm-ex.decorator';
import { Role } from '../entities/role.entity';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {}
