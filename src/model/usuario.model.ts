import { DadosPessoais } from "./dados-pessoais.model";

export class Usuario {
    id: number;
    email: string;
    password?: string;
    dadosPessoais?: DadosPessoais;
    added?: boolean;

    constructor(init: Partial<Usuario>) {
        Object.assign(this, init);
    }
}