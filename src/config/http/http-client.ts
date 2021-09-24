import axios from "axios";
import { enviroment } from "../../env/easychat.env";
import { hasUrlInWhiteList, hasUrlRegistered } from "./urls-permitidas";

const httpClient = axios.create({
  baseURL: enviroment.baseURL,
});

httpClient.interceptors.request.use(oauthInterceptor, (error) =>
  Promise.reject(error)
);
// httpClient.interceptors.response.use(oauthInterceptor, (error) => Promise.reject(error));

function oauthInterceptor(request: any) {
  const baseURL: string = request.baseURL;
  const url: string = request.url;

  if (hasUrlRegistered(baseURL)) {
    if (!hasUrlInWhiteList(url)) {
      const access_token = localStorage.getItem("access_token");
      const Authorization = `Bearer ${access_token}`;

      request.headers = { ...request.header, Authorization };
    }
    return request;
  }

  throw Error("Não possui URL cadastrada");
}

export { httpClient };
