import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { UserRepository } from './user.repository';

@Module({
    imports: [TypeOrmExModule.forCustomRepository([UserRepository])],
    exports: [UserService],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
