import axios from "axios";
import { RegisterForm, LoginForm, User } from "@/interfaces/user";
import { API_URL } from "../utils/url";
import jwt_decode from "jwt-decode";
class AuthService {
  async login(dataForm: LoginForm) {
    const response = await axios.post<User>(API_URL + "users/login", dataForm);
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response;
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(data: RegisterForm) {
    return axios.post<string>(API_URL + "users/createUsers", data);
  }

  getCurrentUser() {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        const decodedUser = jwt_decode(user.token) as User;
        return decodedUser;
      }
    }
    return null;
  }  
}

export default new AuthService();
