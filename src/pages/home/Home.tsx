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

const drawerWidth = 240;

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
      flexShrink: 0
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

  const [loading, setLoading] = useState<boolean>(true);

  const { usuario } = useSelector(usuarioSelector) as UsuarioState;
  const { conversas } = useSelector(conversasSelector) as ConversasState;
  const { conversaAtual } = useSelector(conversasSelector) as ConversasState;

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);

    const idUsuario = oauthService.userFromToken.id;

    dispatch(loadConversas(idUsuario));
    dispatch(loadAvisos(idUsuario));

    if (!usuario) {
      dispatch(loadUsuario(idUsuario));
    }
  }, []);

  const rxStompWS = rxStomp;

  let isAlreadyRegistered = false;

  useEffect(() => {
    if (!isAlreadyRegistered) {
      //subscribe to new Messages
      rxStompWS
        .watch("/topic/chat." + usuario?.dadosPessoais?.username)
        .subscribe(({ body }) => {
          let newMensagem = JSON.parse(body) as Mensagem;
          dispatch(novaMensagem(newMensagem));
          dispatch(incrementaBadge(newMensagem));
          beepNotification();
        });

      //subscribe to new conversations
      rxStompWS
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

      isAlreadyRegistered = true;
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
        <ProfilePicture />
        <Grid container justifyContent="center">
          <Typography variant="body1">{usuario?.dadosPessoais?.nome}</Typography>
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
