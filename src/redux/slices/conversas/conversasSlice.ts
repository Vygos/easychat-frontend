import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { Root } from "../..";
import { Conversa } from "../../../model/conversa.model";
import { Mensagem } from "../../../model/mensagem.model";
import { UsuarioService } from "../../../service/usuario.service";
import { CONVERSAS_SLICE } from "../../constants/contants";

const usuarioService = new UsuarioService();

export interface ConversasState {
  conversas: Conversa[];
  conversaAtual: Conversa;
  loading: boolean;
  error: boolean;
}

const initialState: ConversasState = {
  conversas: [],
  conversaAtual: null,
  loading: null,
  error: null,
};

const conversasSlice = createSlice({
  name: CONVERSAS_SLICE,
  initialState,
  reducers: {
    assignConversas: (state, action) => {
      state.conversas = action.payload;
      state.loading = false;
    },

    initLoadingConversas: (state, action) => {
      state.loading = action.payload;
    },

    selectConversa: (state, action) => {
      state.conversaAtual = action.payload;
    },

    novaMensagem(state, action) {
      const novaMensagem = action.payload as Mensagem;

      if (
        state.conversaAtual &&
        novaMensagem.conversa.id === state.conversaAtual.id
      ) {
        state.conversaAtual.mensagens.push(novaMensagem);
      }

      const predicate = (conversa) => conversa.id === novaMensagem.conversa.id;
      const index = state.conversas.findIndex(predicate);

      state.conversas[index]?.mensagens.push(novaMensagem);
    },

    novaConversa(state, action) {
      console.log("action", action.payload);

      const newConversa = action.payload.conversa as Conversa;

      _.remove(
        newConversa.usuarios,
        (usuario) => usuario.id === action.payload.idUsuario
      );

      newConversa.mensagens = [];

      state.conversas.push(newConversa);
    },

    incrementaBadge(state, action) {
      const mensagem = action.payload as Mensagem;

      if (
        state.conversaAtual &&
        mensagem.conversa.id === state.conversaAtual.id
      ) {
        return;
      }

      const index = state.conversas.findIndex(
        (conversa) => conversa.id === mensagem.conversa.id
      );

      state.conversas[index].badge += 1;
    },

    cleanBadge(state, action) {
      const conversaSelected = action.payload as Conversa;

      const index = state.conversas.findIndex(
        (conversa) => conversa.id === conversaSelected.id
      );

      state.conversas[index].badge = 0;
    },
  },
});

export const loadConversas = (id: number) => async (dispatch) => {
  const { data } = await usuarioService.listAllConversas(id);

  dispatch(assignConversas(data));
};

// ====== SELECTORS ===========

export const conversasSelector = (state: Root) => state.conversasInfo;
export const conversaSelector = (state: Root) =>
  state.conversasInfo.conversaAtual;

export const {
  assignConversas,
  initLoadingConversas,
  selectConversa,
  novaMensagem,
  novaConversa,
  incrementaBadge,
  cleanBadge,
} = conversasSlice.actions;

export default conversasSlice.reducer;
