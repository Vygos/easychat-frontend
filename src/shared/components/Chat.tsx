import {
  AppBar,
  Avatar,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rxStomp } from "../../config/ws/rx-stomp";
import { Conversa } from "../../model/conversa.model";
import { Mensagem } from "../../model/mensagem.model";
import { mensagensToMessagesMapper } from "../../model/mensagens-to-message.mapper";
import { Usuario } from "../../model/usuario.model";
import {
  conversaSelector,
  ConversasState,
  novaMensagem,
} from "../../redux/slices/conversas/conversasSlice";
import { messagesMock } from "../utils/messages-mocks";
import { Message, MessageSent } from "./chat/mui/chat-types";
import { MuiChat } from "./chat/mui/MuiChat";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      backgroundColor: theme.palette.secondary.main,
      color: "black",
    },
    chat: {
      height: "80vh",
      display: "flex",
      flexDirection: "column",
      flex: "1 1 0%",
      // position: 'absolute'
    },
    root: {
      boxShadow: "none",
    },
    avatar: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
  })
);

export const Chat = ({
  usuarioSender,
  ...props
}: {
  usuarioSender: Usuario;
}) => {
  const classes = useStyles();
  const rxStompWS = rxStomp;
  const dispatch = useDispatch();

  const [messages, setMessages] = useState([]);

  const conversaAtual = useSelector(conversaSelector) as Conversa;

  console.log("conversaAtual", conversaAtual)

  useEffect(() => {
    if (conversaAtual) {
      const messagesMap = mensagensToMessagesMapper(
        conversaAtual.mensagens,
        usuarioSender
      );
      setMessages(messagesMap);
    }
  }, [conversaAtual]);

  const onSend = (messageSent: MessageSent) => {
    const message = {
      content: messageSent.content,
      self: true,
      type: "text",
      createdAt: messageSent.date,
    } as Message;

    let mensagem = {
      conteudo: messageSent.content,
      dtMensagem: messageSent.date,
      usuario: usuarioSender,
      conversa: {
        id: conversaAtual.id,
      },
    } as Mensagem;
    
    dispatch(novaMensagem(mensagem));

    rxStompWS.publish({
      body: JSON.stringify(mensagem),
      destination:
        "/app/chat." + conversaAtual?.usuarios[0].dadosPessoais?.username,
    });


    setMessages([...messages, message]);
  };

  return (
    <>
      <AppBar position="static" className={classes.root}>
        <Toolbar className={classes.appBar}>
          <Grid
            container
            justifyContent="flex-start"
            alignContent="center"
            direction="row"
            spacing={2}
          >
            <Grid item>
              <Avatar className={classes.avatar}>
                <Typography variant="subtitle1">
                  {conversaAtual?.usuarios[0].dadosPessoais?.nome
                    ?.toUpperCase()
                    .substring(0, 2)}
                </Typography>
              </Avatar>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" style={{ marginTop: "6px" }}>
                {conversaAtual?.usuarios[0].dadosPessoais?.nome}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.chat}>
        <MuiChat
          messages={messages}
          showDateTime={true}
          type="text"
          onSend={onSend}
        />
      </div>
    </>
  );
};
