import axios from "axios";
import { API_URL } from "../utils/url";
import { IServiceBook } from "../interfaces/servicebook";
import authHeader from "@/services/authHeader";

class ServiceBookService {
  // Récupérer tous les servicebooks
  static async getAllServiceBooks(): Promise<IServiceBook[]> {
    try {
      const response = await axios.get(`${API_URL}servicebook/getallservicebooks`, {
        headers: authHeader(),
      });
      return response.data as IServiceBook[];
    } catch (error) {
      throw new Error(`An error has occurred: ${error}`);
    }
  }

  // Récupérer un servicebooks par ID
  static async getServiceBookById(id: string | string[]): Promise<IServiceBook> {
    try {
      const response = await axios.get(`${API_URL}servicebook/getservicebookbyid/${id}`, {
        headers: authHeader(),
      });
      return response.data as IServiceBook;
    } catch (error) {
      throw new Error(`An error has occurred: ${error}`);
    }
  }

  // Créer un nouvel servicebooks
  static async createServiceBook(spaceData: IServiceBook): Promise<IServiceBook> {
    try {
      const response = await axios.post(
        `${API_URL}servicebook/createservicebook`,
        spaceData,
        { headers: authHeader() }
      );
      return response.data as IServiceBook;
    } catch (error) {
      throw new Error(`An error has occurred: ${error}`);
    }
  }

  // Modifier un servicebooks
  static async updateServiceBook(
    id: string,
    updatedSpaceData: Partial<IServiceBook>
  ): Promise<IServiceBook> {
    try {
      const response = await axios.put(
        `${API_URL}servicebook/update/${id}`,
        updatedSpaceData,
        { headers: authHeader() }
      );
      return response.data as IServiceBook;
    } catch (error) {
      throw new Error(`An error has occurred: ${error}`);
    }
  }

  // Supprimer un servicebooks
  static async deleteServiceBook(id: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}servicebook/delete/${id}`, {
        headers: authHeader(),
      });
    } catch (error) {
      throw new Error(`An error has occurred: ${error}`);
    }
  }

}

export default ServiceBookService;
