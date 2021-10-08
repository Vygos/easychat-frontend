import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { enviroment } from "../env/easychat.env";
import { USUARIO_SLICE } from "./constants/contants";
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

const appReducer = combineReducers<Root>({
  usuarioInfo: usuarioSlice,
  conversasInfo: conversaSlice,
  avisosInfo: avisosSlice,
});

const rootReducer = (state, action) => {
  if (action.type === USUARIO_SLICE + "/logout") {
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}


const store = configureStore({
  reducer: rootReducer,
  devTools: !enviroment.production
});

export const useAppDispatch = store.dispatch;
export default store;
