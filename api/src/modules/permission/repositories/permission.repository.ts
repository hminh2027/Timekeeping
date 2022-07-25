import { EntityRepository } from 'src/common/typeorm/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';

@EntityRepository(Permission)
export class PermissionRepository extends Repository<Permission> {}
