import axios from "axios";
import { API_URL } from "../utils/url";
import { ITreatment } from "../interfaces/treatment";
import authHeader from "@/services/authHeader";

class TreatmentService {
  
  // Récupérer tous les treatment
  static async getAllTreatment(): Promise<ITreatment[]> {
    try {
      const response = await axios.get(`${API_URL}treatments/getalltreatments`, {
        headers: authHeader(),
      });
      return response.data as ITreatment[];
    } catch (error) {
      throw new Error(`An error has occurred: ${error}`);
    }
  }

  // Récupérer un treatment par ID
  static async getTreatmentById(id: string | string[]): Promise<ITreatment> {
    try {
      const response = await axios.get(`${API_URL}treatments/gettreatmentbyid/${id}`, {
        headers: authHeader(),
      });
      return response.data as ITreatment;
    } catch (error) {
      throw new Error(`An error has occurred: ${error}`);
    }
  }

  // Créer un nouvel treatment
  static async createTreatment(treatmentData: ITreatment): Promise<ITreatment> {
    try {
      const response = await axios.post(
        `${API_URL}treatments/createtreatment`,
        treatmentData,
        { headers: authHeader() }
      );
      return response.data as ITreatment;
    } catch (error) {
      throw new Error(`An error has occurred: ${error}`);
    }
  }

  // Modifier un Treatment
  static async updateTreatment(
    id: string,
    updatedTreatmentData: Partial<ITreatment>
  ): Promise<ITreatment> {
    try {
      const response = await axios.put(
        `${API_URL}treatments/updatetreatment/${id}`,
        updatedTreatmentData,
        { headers: authHeader() }
      );
      return response.data as ITreatment;
    } catch (error) {
      throw new Error(`An error has occurred: ${error}`);
    }
  }

  // Supprimer un Treatment
  static async deleteTreatment(id: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}treatments/deletetreatment/${id}`, {
        headers: authHeader(),
      });
    } catch (error) {
      throw new Error(`An error has occurred: ${error}`);
    }
  }

}

export default TreatmentService;
