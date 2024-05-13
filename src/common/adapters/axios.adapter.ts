import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "../interfaces/http-adapter.interface";

// Provider (Clase Wrapper)
// Clase a modificar si cambia algo dentro de Axios
@Injectable()
export class AxiosAdapter implements HttpAdapter {
    // Instanciando a Axios
    private axios: AxiosInstance = axios;

    // Implementando 'get' para realizar fetching
    async get<T>(url: string): Promise<T> {
        try {
            // Obteniendo la 'data' de la respuesta
            const { data } = await this.axios.get<T>(url);
            return data;
        } catch (error) {
            throw new Error('This is an error - Check logs');
        }
    }
}