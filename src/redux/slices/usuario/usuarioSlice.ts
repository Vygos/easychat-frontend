import { createSlice } from "@reduxjs/toolkit";
import { Usuario } from "../../../model/usuario.model";
import { UsuarioService } from "../../../service/usuario.service";
import { USUARIO_SLICE } from "../../constants/contants";

const usuarioService = new UsuarioService();

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
      console.log("action", action)
      state.usuario = action.payload;
      state.loading = false;
    },

    initLoadingUsuario: (state, action) => {
      state.loading = action.payload;
    },

    errorLoadingUsuario: (state) => {
      state.error = true;
    },
  },
});

export const loadUsuario = (id: number) => async (dispatch) => {
  try {
    const { data } = await usuarioService.findById(id);
    dispatch(assignUsuario(data));
  } catch (e) {
    dispatch(errorLoadingUsuario());
  }
};

// ====== SELECTORS ===========

export const usuarioSelector = (state: any) => state.usuarioInfo;

export const { assignUsuario, initLoadingUsuario, errorLoadingUsuario } =
  usuarioSlice.actions;

export default usuarioSlice.reducer;
