import axios from "axios";
import { API_URL } from "../utils/url";
import { FormAccount, User } from "@/interfaces/user";
import authHeader from "@/services/authHeader";

class UserService {
  getAllUsers() {
    return axios.get<User[]>(API_URL + "users/getallusers", { headers : authHeader()});
  }

  deleteUsers(id: string) {
    return axios.delete<User[]>(API_URL + `users/deleteUser/${id}`, { headers : authHeader()});
  }

  getUserById(id: string) {
    return axios.get<User>(API_URL + `users/getUserById/${id}`);
  }

  updateUser(id: string, modifyData: FormAccount) {
    return axios.put<FormAccount>(API_URL + `users/updateUser/${id}`, modifyData, {
      headers: authHeader(),
    });
  }
}

export default new UserService();
