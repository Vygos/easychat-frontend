export enum Messages {
  MSG001 = "Campo de preenchimento obrigatório",
  MSG002 = "Deve possuir email válido",
  MSG003 = "Senhas não correspondem",
  MSG004 = "Email já cadastrado",
  MSG005 = "Cadastro Realizado com sucesso!",
  MSG006 = "Pedido de amizade enviado com sucesso",
  MSG007 = "Ocorreu algum erro durante a operação, tente novamente mais tarde!",
  MSG008 = "Dados atualizados com sucesso"
}

export class MessageHelper {
  message = Messages;
  
}
