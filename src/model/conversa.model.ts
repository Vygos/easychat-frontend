import { Mensagem } from "./mensagem.model";
import { Usuario } from "./usuario.model";

export class Conversa {
  id: string;
  nome: string;
  mensagens: Mensagem[];
  usuarios: Usuario[];

  constructor(init: Partial<Conversa>) {
    Object.assign(this, init);
  }
}
