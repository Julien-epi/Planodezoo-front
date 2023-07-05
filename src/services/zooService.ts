import axios from "axios";
import { API_URL } from "../utils/url";
import authHeader from "@/services/authHeader";

class ZooService {
  canZooOpen() {
    return axios.get(API_URL + "zoo/canZooOpen", { headers : authHeader()});
  }
}

export default new ZooService();
