import { TipoAviso } from "./enums/tipo-aviso.enum";
import { Usuario } from "./usuario.model";

export class Avisos {
    id: number;
    tipo: TipoAviso;
    descricao: string;
    visto: boolean;
    usuario: Usuario;
    contato: Usuario;
    
}