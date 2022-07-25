import { BaseService } from "../base-service";
import { API_ENDPOINTS } from "../endpoints";
import moment from "moment";

class Ticket extends BaseService {
  getMyTicket() {
    return this.http.get(`${this.basePath}/me`).then((res) => res.data);
  }
  getTicket() {
    return this.http.get(`${this.basePath}/ticket`).then((res) => res.data);
  }
}

export const TicketService = new Ticket("ticket");
