import { Conversa } from "./conversa.model";
import { Usuario } from "./usuario.model";

export class Mensagem {
    id: string;
    conteudo: string;
    dtMensagem: Date | string;
    usuario: Usuario;
    conversa: Conversa;
}