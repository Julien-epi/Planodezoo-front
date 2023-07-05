import axios from "axios";
import { API_URL } from "../utils/url";
import authHeader from '@/services/authHeader'; 

class StatisticsService {
  getTicketCountBySpace() {
    return axios.get(API_URL + "tickets/count-by-space", { headers: authHeader() });
  }

  getDailyTicketCountBySpace() {
    return axios.get(API_URL + "tickets/daily-count", { headers: authHeader() });
  }

  getWeeklyTicketCountBySpace() {
    return axios.get(API_URL + "tickets/weekly-count", { headers: authHeader() });
  }
}

export default new StatisticsService();
