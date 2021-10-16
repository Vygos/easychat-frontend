import {
  MenuItem,
  Grid,
  Avatar,
  Typography,
  IconButton,
  Menu,
  makeStyles,
  Theme,
  Box,
  Badge,
} from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import { CheckCircleOutline, Notifications } from "@material-ui/icons";
import { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rxStomp } from "../../config/ws/rx-stomp";
import { Avisos } from "../../model/avisos.model";
import { TipoAviso } from "../../model/enums/tipo-aviso.enum";
import {
  avisosSelector,
  AvisosState,
  novoAviso,
  deletarAviso,
} from "../../redux/slices/avisos/avisosSlice";
import { novaConversa } from "../../redux/slices/conversas/conversasSlice";
import {
  usuarioSelector,
  UsuarioState,
} from "../../redux/slices/usuario/usuarioSlice";
import { OauthService } from "../../service/oauth.service";
import { UsuarioService } from "../../service/usuario.service";
import { PedidoAmizadeAviso } from "./PedidoAmizadeAviso";

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    backgroundColor: deepOrange[500],
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  root: {
    marginTop: theme.spacing(0.5),
  },
}));

export const AvisosNotification = () => {
  const classes = useStyles();
  const usuarioService = new UsuarioService();
  const oauthService = new OauthService();

  const dispatch = useDispatch();

  const { usuario } = useSelector(usuarioSelector) as UsuarioState;
  const { avisos } = useSelector(avisosSelector) as AvisosState;

  const [anchorElAvisos, setAnchorElAvisos] = useState<HTMLElement>(null);

  const isMenuOpenAvisos = Boolean(anchorElAvisos);

  const totalAvisosNaoVistos = avisos
    ? avisos.filter((aviso) => !aviso.visto)
    : avisos;

  useEffect(() => {
    if (usuario && !rxStomp.avisosState) {
      rxStomp.stomp
        .watch("/topic/avisos." + usuario.dadosPessoais.username)
        .subscribe((message) => {
          const newAviso = JSON.parse(message.body);
          dispatch(novoAviso(newAviso));
        });
      rxStomp.avisosState = true;
    }
  }, [usuario]);

  const handleMenuOpenAvisos = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAvisos(event.currentTarget);
  };

  const handleMenuCloseAvisos = (aviso: Avisos) => {
    setAnchorElAvisos(null);

    if (aviso) {
      usuarioService
        .confirmarAmizade(usuario.id, aviso.contato)
        .then((response) => {
          const payload = {
            conversa: response.data,
            idUsuario: usuario.id,
          };

          dispatch(deletarAviso(aviso));
          dispatch(novaConversa(payload));
        });
    }
  };

  const ListaAvisos = forwardRef(() => {
    if (avisos && avisos.length == 0) {
      return <MenuItem>Não possui avisos</MenuItem>;
    }

    return (
      <>
        {avisos &&
          avisos.map((aviso) => {
            return (
              aviso.tipo == TipoAviso.PEDIDO_AMIZADE && (
                <PedidoAmizadeAviso
                  key={aviso.id}
                  aviso={aviso}
                  handleMenuCloseAvisos={handleMenuCloseAvisos}
                />
              )
            );
          })}
      </>
    );
  });

  return (
    <Grid className={classes.root}>
      <IconButton color="inherit" onClick={handleMenuOpenAvisos}>
        <Badge color="error" badgeContent={totalAvisosNaoVistos?.length}>
          <Notifications />
        </Badge>
      </IconButton>
      <Menu
        id="avisos-menu"
        anchorEl={anchorElAvisos}
        keepMounted
        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={isMenuOpenAvisos}
        onClose={handleMenuCloseAvisos}
      >
        <ListaAvisos />
      </Menu>
    </Grid>
  );
};
