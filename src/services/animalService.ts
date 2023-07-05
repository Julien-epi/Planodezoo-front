import axios from "axios";
import { API_URL } from "../utils/url";
import { IAnimal } from "../interfaces/animal";
import authHeader from "@/services/authHeader";

class AnimalService {
  // Récupérer tous les Animal
  static async getAllAnimal(): Promise<IAnimal[]> {
    try {
      const response = await axios.get(`${API_URL}animals/getAnimals`, {
        headers: authHeader(),
      });
      return response.data as IAnimal[];
    } catch (error) {
      throw new Error(`An error has occurred: ${error}`);
    }
  }

  // Récupérer un Animal par ID
  static async getAnimalById(id: string | string[]): Promise<IAnimal> {
    try {
      const response = await axios.get(`${API_URL}animals/getAnimalById/${id}`, {
        headers: authHeader(),
      });
      return response.data as IAnimal;
    } catch (error) {
      throw new Error(`An error has occurred: ${error}`);
    }
  }

  // Créer un nouvel Animal
  static async createAnimal(spaceData: IAnimal): Promise<IAnimal> {
    try {
      const response = await axios.post(
        `${API_URL}animals/createAnimal`,
        spaceData,
        { headers: authHeader() }
      );
      return response.data as IAnimal;
    } catch (error) {
      throw new Error(`An error has occurred: ${error}`);
    }
  }

  // Modifier un Animal
  static async updateAnimal(
    id: string,
    updatedAnimalData: Partial<IAnimal>
  ): Promise<IAnimal> {
    try {
      const response = await axios.put(
        `${API_URL}animals/updateAnimal/${id}`,
        updatedAnimalData,
        { headers: authHeader() }
      );
      return response.data as IAnimal;
    } catch (error) {
      throw new Error(`An error has occurred: ${error}`);
    }
  }

  // Supprimer un Animal
  static async deleteAnimal(id: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}animals/deleteAnimal/${id}`, {
        headers: authHeader(),
      });
    } catch (error) {
      throw new Error(`An error has occurred: ${error}`);
    }
  }

}

export default AnimalService;
