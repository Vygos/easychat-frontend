import {
  createStyles,
  CssBaseline,
  Drawer,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rxStomp } from "../../config/ws/rx-stomp";
import useWebSocket from "../../hooks/useWebSocket";
import { Conversa } from "../../model/conversa.model";
import { Mensagem } from "../../model/mensagem.model";
import { useAppDispatch } from "../../redux";
import { loadAvisos } from "../../redux/slices/avisos/avisosSlice";
import {
  conversasSelector,
  ConversasState,
  incrementaBadge,
  loadConversas,
  novaConversa,
  novaMensagem,
} from "../../redux/slices/conversas/conversasSlice";
import {
  loadUsuario,
  usuarioSelector,
  UsuarioState,
} from "../../redux/slices/usuario/usuarioSlice";
import { OauthService } from "../../service/oauth.service";
import { Chat } from "../../shared/components/Chat";
import Contatos from "../../shared/components/Contatos";
import Navbar from "../../shared/components/Navbar";
import { NoChatSelected } from "../../shared/components/NoChatSelected";
import { ProfilePicture } from "../../shared/components/ProfilePicture";
import { Spinner } from "../../shared/components/Spinner";
import Toast from "../../shared/components/Toast";
import homeStyle from "./home-style";

function Home() {
  const classes = homeStyle();
  const oauthService = new OauthService();
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch;

  const [loading, setLoading] = useState<boolean>(true);
  const [toast, setToast] = useState({
    open: false,
    msg: "",
    severity: "success",
  });

  const { usuario } = useSelector(usuarioSelector) as UsuarioState;
  const { conversaAtual } = useSelector(conversasSelector) as ConversasState;

  const newMessageWs = useWebSocket<Mensagem>("/topic/chat", usuario, "chatState");
  const newConversaWs = useWebSocket<Conversa>("/topic/conversa", usuario, "conversasState");

  useEffect(() => {
    (async () => {
      setLoading(true);
      const idUsuario = oauthService.userFromToken.id;

      try {
        await appDispatch(loadConversas(idUsuario));
        await appDispatch(loadAvisos(idUsuario));
        await appDispatch(loadUsuario(idUsuario));

        setLoading(false);
      } catch (err) {
        setLoading(false);
        setToast({
          ...toast,
          open: true,
          msg: err.message,
          severity: "error",
        });
      }
    })();
  }, []);

  useEffect(() => {
    console.log("CHEGOU")
    const { response } = newMessageWs;

    if (response) {
      dispatch(novaMensagem(response));
      dispatch(incrementaBadge(response));
      beepNotification();
    }
  }, [newMessageWs.response]);
  
  useEffect(() => {
    const { response } = newConversaWs;
    
    if (response) {
      
      const payload = {
        conversa: response,
        idUsuario: usuario?.id,
      };
      
      dispatch(novaConversa(payload));
      beepNotification();
    }
  }, [newConversaWs.response]);

  const beepNotification = () => {
    if (document.hidden) {
      const audio = new Audio(
        "https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3"
      );
      audio.play();
    }
  };

  const getFoto = () => {
    return usuario && usuario.dadosPessoais.foto
      ? usuario.dadosPessoais.foto
      : "";
  };

  return (
    <div className={classes.root}>
      {loading && <Spinner size={50} />}
      <Toast
        open={toast.open}
        duration={3000}
        position={{ vertical: "top", horizontal: "right" }}
        severity={toast.severity}
        message={toast.msg}
        handleClose={() => setToast({ ...toast, open: false })}
      />
      <CssBaseline />
      <Navbar extensible />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        open={true}
        color="primary"
        classes={{ paper: classes.drawer }}
      >
        <ProfilePicture base64={getFoto()} />
        <Grid container justifyContent="center">
          <Typography variant="body1">
            {usuario?.dadosPessoais?.nome}
          </Typography>
        </Grid>
        <Contatos />
      </Drawer>
      <main className={classes.main}>
        <div className={classes.toolbar} />
        {conversaAtual ? <Chat usuarioSender={usuario} /> : <NoChatSelected />}
      </main>
    </div>
  );
}

export default Home;
