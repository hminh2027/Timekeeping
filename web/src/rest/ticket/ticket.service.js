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
  approveTicket(id) {
    return this.http.patch(`${this.basePath}/${id}/approve`).then((res)=> res.data);
  }
  rejectTicket(id) {
    return this.http.patch(`${this.basePath}/${id}/reject`).then((res) => res.data);
  }
  deleteTicket(id) {
    return this.http.delete(`${this.basePath}/${id}`);
  }
}


export const TicketService = new Ticket("ticket");
