import {
  createStyles,
  CssBaseline,
  Drawer,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { rxStomp } from "../../config/ws/rx-stomp";
import { Conversa } from "../../model/conversa.model";
import { Mensagem } from "../../model/mensagem.model";
import { OauthService } from "../../service/oauth.service";
import { UsuarioService } from "../../service/usuario.service";
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
  const usuarioService = new UsuarioService();
  const usuario = oauthService.userFromToken;

  const [loading, setLoading] = useState<boolean>(true);
  const [conversa, setConversa] = useState<Conversa>();
  const [conversas, setConversas] = useState<Conversa[]>();
  const [mensagem, setMensagem] = useState<Mensagem>();

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const rxStompWS = rxStomp;

  useEffect(() => {
    rxStompWS
      .watch("/topic/chat." + usuario.dadosPessoais?.username)
      .subscribe((e) => {
        console.log("Chat", e);
        let novaMensagem = JSON.parse(e.body) as Mensagem;
        setMensagem(novaMensagem);
        beepNotification();
      });
  }, []);

  useEffect(() => {
    usuarioService
      .listAllConversas(usuario.id)
      .then((response) => setConversas(response.data))
      .catch((error) => console.log("error"));
  }, []);

  useEffect(() => {
    if (!conversas) {
      return;
    }

    if (conversa && conversa.id === mensagem.conversa.id) {
      let mensagens = [...conversa.mensagens, mensagem];
      setConversa({ ...conversa, mensagens });
    }

    let conversasUpdate = conversas.map((conversa) => {
      let mensagens = [...conversa.mensagens, mensagem];
      return conversa.id === mensagem.conversa.id
        ? { ...conversa, mensagens }
        : conversa;
    });

    setConversas(conversasUpdate);
  }, [mensagem]);

  const beepNotification = () => {
    if (document.hidden) {
      const audio = new Audio(
        "https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3"
      );
      audio.play();
    }
  };

  const Contatos = () => (
    <div className={classes.contacts}>
      {conversas &&
        conversas.map((conversa, index) => (
          <div key={index} onClick={() => setConversa(conversa)}>
            <Contato nome={conversa.usuarios[0].dadosPessoais?.nome} />
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
        classes={{ paper: classes.drawer }}
      >
        <ProfilePicture />
        <Contatos />
      </Drawer>
      <main className={classes.main}>
        <div className={classes.toolbar} />
        {conversa ? (
          <Chat conversa={conversa} usuarioSender={usuario} />
        ) : (
          <NoChatSelected />
        )}
      </main>
    </div>
  );
}

export default Home;
