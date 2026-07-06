import axios from "axios";
import { env } from "./env";

export const api = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
});

api.interceptors.request.use((config) => {

  //? Si existe un access_token la api lo usa para tener permisos en las peticiones
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  //? Si existe una sucursal ingresada la api la usa para identificar donde guardar los datos
  const branch = localStorage.getItem("branch");
  if (branch) {
    const branchData = JSON.parse(branch);
    if (branchData?._id) {
      config.params = {
        ...config.params,
        branchId: branchData._id,
      };
    }
  }

  return config;
});

export function getMessageErrorApi(error: any): string {
  if (!axios.isAxiosError(error)) return "Ocurrió un error inesperado";

  const message = error.response?.data?.message;

  if (!message) return "Error de conexión";
  if (Array.isArray(message)) return message[0];
  
  return message;
}