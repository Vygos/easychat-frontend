import { AxiosResponse } from "axios";
import jwt_decode from "jwt-decode";
import { enviroment } from "../env/easychat.env";
import { JWT } from "../model/jwt.model";
import { Usuario } from "../model/usuario.model";
import { HttpBaseService } from "./http-base.service";

export class OauthService extends HttpBaseService {
  private readonly BASE_PATH = "/oauth/token";

  getToken(usuario: Usuario): Promise<AxiosResponse<JWT>> {
    const authorization = btoa(`${enviroment.clientId}:${enviroment.clientId}`);
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${authorization}`,
    };

    const body = `username=${usuario.email}&password=${usuario.password}&grant_type=password`;

    return this.httpClient.post<JWT>(`${this.BASE_PATH}`, body, { headers });
  }

  get userFromToken(): Usuario {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      throw Error("Sessão Expirada");
    }

    const decodedToken: any = jwt_decode(accessToken);

    return {
      id: decodedToken.id,
      email: decodedToken.email,
      dadosPessoais: {
        username: decodedToken.userName,
      },
    };
  }

  setToken(jwt: JWT) {
    localStorage.setItem("access_token", jwt.access_token);
    localStorage.setItem("refresh_token", jwt.access_token);
  }

  get token(): JWT {
    const access_token = localStorage.getItem("access_token") as string;
    const refresh_token = localStorage.getItem("access_token") as string;

    return { access_token, refresh_token };
  }

  get isTokenExpired() {
    if (!this.token.access_token) {
      return true;
    }

    const tokenDecoded: { exp: number } = jwt_decode(this.token.access_token);

    if (tokenDecoded) {
      if (new Date(tokenDecoded.exp * 1000) > new Date()) {
        return false;
      }
      return true;
    }
    return true;
  }

  removeToken() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
}
