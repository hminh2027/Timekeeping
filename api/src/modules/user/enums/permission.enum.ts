import { CommentPermission } from 'src/modules/comment/enums/permission.enum';

const UserPermission = {
  ...CommentPermission,
};

export type UserPermission = CommentPermission;
