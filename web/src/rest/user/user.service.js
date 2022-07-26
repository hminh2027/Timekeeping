import { BaseService } from "../base-service";

class User extends BaseService {
  getManagers() {
    return this.http.get(`${this.basePath}/admin`).then((res) => res.data);
  }
}

export const UserService = new User("user");
