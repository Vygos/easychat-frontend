import { Message } from "../shared/components/chat/mui/chat-types";
import { Mensagem } from "./mensagem.model";
import { Usuario } from "./usuario.model";

export function mensagemToMessageMapper(
  mensagem: Mensagem,
  usuarioSender: Usuario
): Message {

  return {
    content: mensagem.conteudo,
    createdAt: mensagem.dtMensagem,
    type: "text",
    self: usuarioSender.id === mensagem?.usuario.id,
  };
}

export function mensagensToMessagesMapper(
  mensagens: Mensagem[],
  usuarioSender: Usuario
) {
  if (!mensagens) {
    return;
  }
  return mensagens.map((mensagem) =>
    mensagemToMessageMapper(mensagem, usuarioSender)
  );
}
