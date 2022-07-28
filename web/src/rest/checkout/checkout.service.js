import { BaseService } from "../base-service";
import { API_ENDPOINTS } from "../endpoints";
import moment from "moment";

class CheckOut extends BaseService {
  getCheckOut() {
    return this.http.get(`${this.basePath}`).then((res) => res.data);
  }
  postCheckOut(data) {
    return this.http.post(`${this.basePath}`, data).then((res) => res.data);
  }
}

export const CheckOutService = new CheckOut("checkout");
