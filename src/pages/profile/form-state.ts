import moment from "moment";
import { Usuario } from "../../model/usuario.model";
import { Messages } from "../../shared/messages/validation-messages";
import * as yup from "yup";

export const getProfileInitialState = (usuario: Usuario) => ({
  id: usuario ? usuario.id : "",
  nome: usuario ? usuario.dadosPessoais.nome : "",
  username: usuario ? usuario.dadosPessoais.username : "",
  email: usuario ? usuario.email : "",
  dtNascimento:
    usuario && usuario.dadosPessoais.dtNascimento
      ? moment(usuario.dadosPessoais.dtNascimento).format("YYYY-MM-DD")
      : "",
  dtCadastro: usuario
    ? moment(usuario.dadosPessoais.dtCadastro).format("YYYY-MM-DD")
    : "",
});

export const getSchemaProfile = yup.object({
  id: yup.number(),
  nome: yup.string().required(Messages.MSG001),
  username: yup.string().required(Messages.MSG001),
  email: yup.string(),
  dtNascimento: yup.date(),
  dtCadastro: yup.date(),
});
