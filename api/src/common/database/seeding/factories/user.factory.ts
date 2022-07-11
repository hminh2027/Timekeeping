import { UserRole } from "src/modules/user/enums/role.enum";
import { User } from "src/modules/user/entities/user.entity";
import { define } from "typeorm-seeding";

define(User, () => {
  const user = new User();
  user.email = 'admin@vdtsol.com';
  user.password = '123456';
  user.role = UserRole.ADMIN;
  user.firstName = 'admin';
  user.lastName = 'admin';
  return user;
})