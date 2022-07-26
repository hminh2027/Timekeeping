import { BaseService } from "../base-service";
import { API_ENDPOINTS } from "../endpoints";
import moment from "moment";

class User extends BaseService {
    getUser(sort) {
        return this.http.get(`${this.basePath}?${sort}`).then((res) => res.data);
    }
    deleteUser(id) {
        return this.http.delete(`${this.basePath}/${id}`);
    }
    updateUser(id,data) {
        return this.http.patch(`${this.basePath}/${id}`, data).then((res) => res.data);
    }
    getUserId(id) {
        return this.http.get(`${this.basePath}/${id}`).then((res) => res.data);
    }
    
    
}

export const UserService = new User("user");