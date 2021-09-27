import { AxiosResponse } from "axios";
import { httpClient } from "../config/http/http-client";
import { Avisos } from "../model/avisos.model";

export class AvisosService {
  private httpClient = httpClient;

  private readonly BASE_PATH = "avisos";

  salvar(aviso: Avisos): Promise<AxiosResponse<Avisos>> {
    return this.httpClient.post<Avisos>(`${this.BASE_PATH}`, aviso);
  }

  delete(id: number): Promise<AxiosResponse<void>> {
    return this.httpClient.delete(`${this.BASE_PATH}/${id}`);
  }
}
