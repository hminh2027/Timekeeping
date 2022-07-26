import { BaseService } from "../base-service";
import { API_ENDPOINTS } from "../endpoints";
import moment from "moment";

class Ticket extends BaseService {
  getMyTicket() {
    return this.http.get(`${this.basePath}/me`).then((res) => res.data);
  }
  getMyTicketWithSort(sortOptions) {
    return this.http
      .get(`${this.basePath}/me?${sortOptions}`)
      .then((res) => res.data);
  }
  getTicketInfo(id) {
    const url = `${this.basePath}/${id}`;
    // console.log("URL", url);
    return this.http.get(url).then((res) => res.data);
  }
  updateTicketInfo(id, ticketInfo) {
    return this.http
      .patch(`${this.basePath}/${id}`, ticketInfo)
      .then((res) => res.data);
  }
}

export const TicketService = new Ticket("ticket");
