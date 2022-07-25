import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './controllers/permission.controller';
import { TypeOrmExModule } from 'src/common/typeorm/typeorm-ex.module';
import { PermissionRepository } from './repositories/permission.repository';

@Module({
  imports: [TypeOrmExModule.forRepository([PermissionRepository])],
  exports: [PermissionService],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
