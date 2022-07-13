import { Repository } from 'typeorm';
import { EntityRepository } from 'src/common/typeorm/typeorm-ex.decorator';
import { Comment } from '../entities/comment.entity';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {}
