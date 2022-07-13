import { PickType } from '@nestjs/swagger';
import { CommentPayload } from './comment.payload';

export class UpdateCommentPayload extends PickType(CommentPayload, [
  'content',
  'userId',
]) {}
