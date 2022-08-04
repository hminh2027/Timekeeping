import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/common/typeorm/typeorm-ex.module';
import { UserController } from './controllers/user.controller';

import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { ContactModule } from '../contact/contact.module';

@Module({
  imports: [TypeOrmExModule.forRepository([UserRepository]), ContactModule],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService],
})
export class UserModule {}
