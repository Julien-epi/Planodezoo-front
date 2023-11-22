import axios from "axios";
import { API_URL } from "../utils/url";

class WebhooksDocker {
  NotifyImahePushed() {
    return axios.post(API_URL + "notifyImagePushed");
  }
}

export default new WebhooksDocker();
