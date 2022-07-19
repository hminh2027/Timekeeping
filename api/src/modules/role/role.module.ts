import { Module } from '@nestjs/common';
import { RoleService } from './services/role.service';
import { RoleController } from './controllers/role.controller';
import { TypeOrmExModule } from 'src/common/typeorm/typeorm-ex.module';
import { RoleRepository } from './repositories/role.repository';

@Module({
  imports: [TypeOrmExModule.forRepository([RoleRepository])],
  exports: [RoleService],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
