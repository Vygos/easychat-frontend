import { httpClient } from "../config/http/http-client";

export class HttpBaseService {
    protected httpClient = httpClient;
}