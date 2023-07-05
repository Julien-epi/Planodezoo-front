import axios from "axios";
import { API_URL } from "../utils/url";
import { ISpace } from "../interfaces/space";
import authHeader from "@/services/authHeader";

class SpaceService {
  // Récupérer tous les espaces
  static async getAllSpaces(): Promise<ISpace[]> {
    try {
      const response = await axios.get(`${API_URL}spaces/getallspaces`, {
        // headers: authHeader(),
      });
      return response.data as ISpace[];
    } catch (error) {
      throw new Error(`An error has occurred: ${error}`);
    }
  }

  static async getSpaceByName(name: string): Promise<ISpace> {
    try {
      const response = await axios.get(`${API_URL}spaces/getspacebyname/${name}`, { headers: authHeader() });
      return response.data as ISpace;
    } catch (error) {
      throw new Error(`An error has occurred: ${error}`);
    }
  }

  // Récupérer un espace par ID
  static async getSpaceById(id: string | string[]): Promise<ISpace> {
    try {
      const response = await axios.get(`${API_URL}spaces/getspacebyid/${id}`, {
        headers: authHeader(),
      });
      return response.data as ISpace;
    } catch (error) {
      throw new Error(`An error has occurred: ${error}`);
    }
  }

  // Créer un nouvel espace
  static async createSpace(spaceData: ISpace): Promise<ISpace> {
    try {
      const response = await axios.post(
        `${API_URL}spaces/createspace`,
        spaceData,
        { headers: authHeader() }
      );
      return response.data as ISpace;
    } catch (error) {
      throw new Error(`An error has occurred: ${error}`);
    }
  }

  // Modifier un espace
  static async updateSpace(
    id: string,
    updatedSpaceData: Partial<ISpace>
  ): Promise<ISpace> {
    try {
      const response = await axios.put(
        `${API_URL}spaces/update/${id}`,
        updatedSpaceData,
        { headers: authHeader() }
      );
      return response.data as ISpace;
    } catch (error) {
      throw new Error(`An error has occurred: ${error}`);
    }
  }

  // Supprimer un espace
  static async deleteSpace(id: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}spaces/delete/${id}`, {
        headers: authHeader(),
      });
    } catch (error) {
      throw new Error(`An error has occurred: ${error}`);
    }
  }

  // Mettre en maintenance un espace
  static async setMaintenance(id: string): Promise<ISpace> {
    try {
      const response = await axios.put(`${API_URL}spaces/maintenance/${id}`);
      return response.data as ISpace;
    } catch (error) {
      throw new Error(`An error has occurred: ${error}`);
    }
  }

  // Lever la maintenance d'un espace
  static async unsetMaintenance(id: string): Promise<ISpace> {
    try {
      const response = await axios.put(
        `${API_URL}spaces/maintenanceoff/${id}`,
      );
      return response.data as ISpace;
    } catch (error) {
      throw new Error(`An error has occurred: ${error}`);
    }
  }
}

export default SpaceService;
