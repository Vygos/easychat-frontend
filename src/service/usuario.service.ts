import { AxiosResponse } from "axios";
import { httpClient } from "../config/http/http-client";
import { Avisos } from "../model/avisos.model";
import { Conversa } from "../model/conversa.model";
import { Usuario } from "../model/usuario.model";

export class UsuarioService {
  private httpClient = httpClient;

  private readonly BASE_PATH = "usuario";

  cadastrar(usuario: Usuario, headers) {
    return this.httpClient.post<Usuario>(`${this.BASE_PATH}`, usuario, {
      headers,
    });
  }

  existsByEmail(email: string) {
    return this.httpClient.get(`${this.BASE_PATH}/existsByEmail`, {
      params: { email },
    });
  }

  listAllConversas(id: number): Promise<AxiosResponse<Conversa[]>> {
    return this.httpClient.get(`${this.BASE_PATH}/${id}/conversas`);
  }

  search(username: string, id: number): Promise<AxiosResponse<Usuario[]>> {
    return this.httpClient.get<Usuario[]>(`${this.BASE_PATH}/${id}/search`, {
      params: { username },
    });
  }

  findById(id: number): Promise<AxiosResponse<Usuario>> {
    return this.httpClient.get<Usuario>(`${this.BASE_PATH}/${id}`);
  }

  listAllAvisos(id: number): Promise<AxiosResponse<Avisos[]>> {
    return this.httpClient.get<Avisos[]>(`${this.BASE_PATH}/${id}/avisos`);
  }

  confirmarAmizade(
    id: number,
    novoContato: Usuario
  ): Promise<AxiosResponse<Conversa>> {
    return this.httpClient.post<Conversa>(
      `${this.BASE_PATH}/${id}/confirmar-amizade`,
      novoContato
    );
  }
}
