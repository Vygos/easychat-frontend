import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { enviroment } from "../env/easychat.env";
import avisosSlice, { AvisosState } from "./slices/avisos/avisosSlice";
import conversaSlice, {
  ConversasState,
} from "./slices/conversas/conversasSlice";
import usuarioSlice, { UsuarioState } from "./slices/usuario/usuarioSlice";

export interface Root {
  usuarioInfo: UsuarioState;
  conversasInfo: ConversasState;
  avisosInfo: AvisosState;
}

const reducers = combineReducers<Root>({
  usuarioInfo: usuarioSlice,
  conversasInfo: conversaSlice,
  avisosInfo: avisosSlice,
});

const store = configureStore({
  reducer: reducers,
  devTools: !enviroment.production
});

export default store;
