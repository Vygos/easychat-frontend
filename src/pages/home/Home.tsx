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
import { Conversa } from "../../model/conversa.model";
import { Mensagem } from "../../model/mensagem.model";
import { useAppDispatch } from "../../redux";
import { loadAvisos } from "../../redux/slices/avisos/avisosSlice";
import {
  cleanBadge,
  conversasSelector,
  ConversasState,
  incrementaBadge,
  loadConversas,
  novaConversa,
  novaMensagem,
  selectConversa,
} from "../../redux/slices/conversas/conversasSlice";
import {
  loadUsuario,
  usuarioSelector,
  UsuarioState,
} from "../../redux/slices/usuario/usuarioSlice";
import { OauthService } from "../../service/oauth.service";
import { Chat } from "../../shared/components/Chat";
import { Contato } from "../../shared/components/Contato";
import Navbar from "../../shared/components/Navbar";
import { NoChatSelected } from "../../shared/components/NoChatSelected";
import { ProfilePicture } from "../../shared/components/ProfilePicture";
import { Spinner } from "../../shared/components/Spinner";
import Toast from "../../shared/components/Toast";

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    toolbar: theme.mixins.toolbar,
    contacts: {
      marginTop: "30px",
    },
    main: {
      width: "100%",
      height: "100%",
    },
  })
);

function Home() {
  const classes = useStyles();
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
  const { conversas } = useSelector(conversasSelector) as ConversasState;
  const { conversaAtual } = useSelector(conversasSelector) as ConversasState;

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

  const rxStompWS = rxStomp;

  useEffect(() => {
    const { chatState, conversasState} = rxStompWS;

    if (usuario && !chatState && !conversasState) {
      //subscribe to new Messages
      rxStompWS
        .stomp
        .watch("/topic/chat." + usuario?.dadosPessoais?.username)
        .subscribe(({ body }) => {
          let newMensagem = JSON.parse(body) as Mensagem;
          dispatch(novaMensagem(newMensagem));
          dispatch(incrementaBadge(newMensagem));
          beepNotification();
        });

      //subscribe to new conversations
      rxStompWS
        .stomp
        .watch("/topic/conversa." + usuario?.dadosPessoais?.username)
        .subscribe(({ body }) => {
          let newConversa = JSON.parse(body) as Conversa;

          const payload = {
            conversa: newConversa,
            idUsuario: usuario.id,
          };

          dispatch(novaConversa(payload));
          beepNotification();
        });
      
      rxStompWS.chatState = true
      rxStompWS.conversasState = true;
    }
  }, [usuario]);

  const beepNotification = () => {
    if (document.hidden) {
      const audio = new Audio(
        "https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3"
      );
      audio.play();
    }
  };

  const handleSelectConversa = (conversa: Conversa) => {
    dispatch(selectConversa(conversa));
    dispatch(cleanBadge(conversa));
  };

  const getFoto = () => {
    return usuario && usuario.dadosPessoais.foto
      ? usuario.dadosPessoais.foto
      : "";
  };

  const Contatos = () => (
    <div className={classes.contacts}>
      {conversas &&
        conversas.map((conversa, index) => (
          <div key={index} onClick={() => handleSelectConversa(conversa)}>
            <Contato
              conversa={conversa}
              selected={conversa.id === conversaAtual?.id}
            />
          </div>
        ))}
    </div>
  );

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
      <Navbar />
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
