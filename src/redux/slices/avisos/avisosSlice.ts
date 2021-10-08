import { createSlice } from "@reduxjs/toolkit";
import { Avisos } from "../../../model/avisos.model";
import { AvisosService } from "../../../service/avisos.service";
import { UsuarioService } from "../../../service/usuario.service";
import { AVISOS_SLICE } from "../../constants/contants";

const usuarioService = new UsuarioService();
const avisosService = new AvisosService();

export interface AvisosState {
  avisos: Avisos[];
  loading: boolean;
  error: boolean;
}

const initialState: AvisosState = {
  avisos: [],
  loading: null,
  error: null,
};

const avisosSlice = createSlice({
  name: AVISOS_SLICE,
  initialState,
  reducers: {
    assignAvisos: (state, action) => {
      state.avisos = action.payload;
      state.loading = false;
    },

    initLoadingAvisos: (state, action) => {
      state.loading = action.payload;
    },

    novoAviso: (state, action) => {
      state.avisos.push(action.payload);
    },

    deleteAviso: (state, action) => {
      const avisos = state.avisos.filter(
        (aviso) => aviso.id !== action.payload.id
      );

      state.avisos = avisos;
    },
  },
});

export const deletarAviso = (aviso: Avisos) => async (dispatch) => {
  await avisosService.delete(aviso.id);
  dispatch(deleteAviso(aviso));
};

export const loadAvisos = (id: number) => async (dispatch) => {
  const { data } = await usuarioService.listAllAvisos(id);
  dispatch(assignAvisos(data));
};

// ====== SELECTORS ===========

export const avisosSelector = (state: any) => state.avisosInfo;

export const { assignAvisos, initLoadingAvisos, novoAviso, deleteAviso } =
  avisosSlice.actions;

export default avisosSlice.reducer;
