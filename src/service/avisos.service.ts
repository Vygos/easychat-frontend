import { AxiosResponse } from "axios";
import { Avisos } from "../model/avisos.model";
import { HttpBaseService } from "./http-base.service";

export class AvisosService extends HttpBaseService {

  private readonly BASE_PATH = "avisos";

  salvar(aviso: Avisos): Promise<AxiosResponse<Avisos>> {
    return this.httpClient.post<Avisos>(`${this.BASE_PATH}`, aviso);
  }

  delete(id: number): Promise<AxiosResponse<void>> {
    return this.httpClient.delete(`${this.BASE_PATH}/${id}`);
  }
}
