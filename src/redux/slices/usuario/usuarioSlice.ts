import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Usuario } from "../../../model/usuario.model";
import { UsuarioService } from "../../../service/usuario.service";
import { USUARIO_SLICE } from "../../constants/contants";

const usuarioService = new UsuarioService();

export const updateUser = createAsyncThunk(
  USUARIO_SLICE + "/updateUser",
  async (id: number) => {
    const { data } = await usuarioService.findById(id);

    return data;
  }
);
export interface UsuarioState {
  usuario: Usuario;
  loading: boolean;
  error: boolean;
}

const initialState: UsuarioState = {
  usuario: null,
  loading: null,
  error: null,
};

const usuarioSlice = createSlice({
  name: USUARIO_SLICE,
  initialState,
  reducers: {
    assignUsuario: (state, action) => {
      state.usuario = action.payload;
      state.loading = false;
    },

    initLoadingUsuario: (state, action) => {
      state.loading = action.payload;
    },

    logout: (state) => {},
  },
});

export const loadUsuario = (id: number) => async (dispatch) => {
  const { data } = await usuarioService.findById(id);
  dispatch(assignUsuario(data));
};

export const updateUsuario = (usuario: Usuario) => async (dispatch) => {
  const { data } = await usuarioService.atualizar(usuario);
  dispatch(assignUsuario(data));
};

// ====== SELECTORS ===========

export const usuarioSelector = (state: any) => state.usuarioInfo as UsuarioState;

export const { assignUsuario, initLoadingUsuario, logout } = usuarioSlice.actions;

export default usuarioSlice.reducer;
