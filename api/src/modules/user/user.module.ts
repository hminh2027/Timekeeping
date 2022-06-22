import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { userProviders } from './user.repository';

@Module({
    imports: [DatabaseModule],
    exports: [UserService],
    providers: [
        ...userProviders,
        UserService
    ],
    controllers: [UserController],
})
export class UserModule {}
