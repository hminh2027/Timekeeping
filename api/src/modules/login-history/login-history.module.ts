import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/common/typeorm/typeorm-ex.module';
import { LoginHistoryRepository } from './repositories/login-history.repository';
import { LoginHistoryService } from './services/login-history.service';

@Module({
  imports: [TypeOrmExModule.forRepository([LoginHistoryRepository])],
  exports: [LoginHistoryService],
  providers: [LoginHistoryService],
})
export class LoginHistoryModule {}
