import { BaseService } from "../base-service";
import { API_ENDPOINTS } from "../endpoints";
import moment from "moment";

class Ticket extends BaseService {
  getMyTicket() {
    return this.http.get(`${this.basePath}/me`).then((res) => res.data);
  }
  getTicket(sort) {
    return this.http.get(`${this.basePath}?${sort}`).then((res) => res.data);
  }
  getTicketId(id) {
    return this.http.get(`${this.basePath}/${id}`).then((res) => res.data);
  }
  getTicketType() {
    return this.http.get(`${this.basePath}/type`).then((res) => res.data); 
  }
}

export const TicketService = new Ticket("ticket");
