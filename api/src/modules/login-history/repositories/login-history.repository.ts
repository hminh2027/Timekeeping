import { EntityRepository } from 'src/common/typeorm/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { LoginHistory } from '../entities/login-history.entity';

@EntityRepository(LoginHistory)
export class LoginHistoryRepository extends Repository<LoginHistory> {}
