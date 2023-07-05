import axios from "axios";
import { API_URL } from "../utils/url";
import { TicketForm } from "@/interfaces/ticket";
import authHeader from '@/services/authHeader'; 
class TicketService {
  createTicket(data: TicketForm) {
    return axios.post<string>(API_URL + "tickets/createTicket", data, { headers: authHeader() });
  }

  checkTicket(id: string) {
    return axios.get(API_URL + "checkTickets/" + id);
  }
}

export default new TicketService();
