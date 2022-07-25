import {BaseService} from '../base-service';
import {API_ENDPOINTS} from '../endpoints';
import moment from 'moment';


class Auth extends BaseService {
  getMe() {
    return this.http.get('auth/me').then(res => res.data);
  }
  login(input) {
    return this.http
      .post(`${this.basePath}/login`, input)
      .then(res => res.data);
  }
  postUser(data) {
    return this.http.post(`${this.basePath}/register`, data);
  }
}

export const AuthService = new Auth('auth');
