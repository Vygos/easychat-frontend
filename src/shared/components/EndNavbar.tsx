import {
  Grid,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Theme,
  Typography,
} from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import {
  Notifications,
  ExitToApp,
  Watch,
  CheckCircleOutline,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { forwardRef, useEffect, useState } from "react";
import { rxStomp } from "../../config/ws/rx-stomp";
import { Avisos } from "../../model/avisos.model";
import { TipoAviso } from "../../model/enums/tipo-aviso.enum";
import { Usuario } from "../../model/usuario.model";
import { OauthService } from "../../service/oauth.service";
import { UsuarioService } from "../../service/usuario.service";

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    backgroundColor: deepOrange[500],
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

export const EndNavbar = ({ userPrincipal }: { userPrincipal: Usuario }) => {
  const classes = useStyles();
  const usuarioService = new UsuarioService();
  const oauthService = new OauthService();

  const [anchorElAccount, setAnchorElAccount] = useState<HTMLElement>(null);
  const [anchorElAvisos, setAnchorElAvisos] = useState<HTMLElement>(null);
  const [avisos, setAvisos] = useState<Avisos[]>(null);
  const [newAviso, setNewAviso] = useState<Avisos>(null);

  const isMenuOpenAccount = Boolean(anchorElAccount);
  const isMenuOpenAvisos = Boolean(anchorElAvisos);

  const totalAvisosNaoVistos = avisos
    ? avisos.filter((aviso) => !aviso.visto)
    : avisos;

  useEffect(() => {
    usuarioService
      .listAllAvisosByUsuario(oauthService.userFromToken.id)
      .then((response) => setAvisos(response.data));
  }, []);

  useEffect(() => {
    if (userPrincipal) {
      rxStomp
        .watch("/topic/avisos." + userPrincipal.dadosPessoais.username)
        .subscribe((message) => {
          const aviso = JSON.parse(message.body);
          setNewAviso(aviso);
        });
    }
  }, [userPrincipal]);

  useEffect(() => {
    if (!newAviso) {
      return;
    }
    setAvisos([...avisos, newAviso]);
  }, [newAviso]);

  const handleMenuClose = () => {
    setAnchorElAccount(null);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAccount(event.currentTarget);
  };

  const handleMenuOpenAvisos = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAvisos(event.currentTarget);
  };

  const handleMenuCloseAvisos = (aviso) => {
    setAnchorElAvisos(null);

    const newAvisos = avisos.filter((avs) => avs.id !== aviso.id);
    setAvisos(newAvisos);
  };

  const MenuAccount = () => (
    <Menu
      anchorEl={anchorElAccount}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id="account-menu"
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpenAccount}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const ListaAvisos = forwardRef(() => {
    if (avisos && avisos.length == 0) {
      return <MenuItem>Não possui avisos</MenuItem>;
    }

    return (
      <>
        {avisos && avisos.map((aviso) => {
          return (
            aviso.tipo == TipoAviso.PEDIDO_AMIZADE && (
              <PedidoAmizade key={aviso.id} aviso={aviso} />
            )
          );
        })}
      </>
    );
  });

  const PedidoAmizade = ({ aviso }: { aviso: Avisos }) => {
    return (
      <MenuItem>
        <Grid item xs={4}>
          <Avatar className={classes.avatar}>
            <Typography variant="caption">
              {aviso.contato.dadosPessoais.nome.toUpperCase().substring(0, 2)}
            </Typography>
          </Avatar>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption">
            {aviso.contato.dadosPessoais.username} {aviso.descricao}
          </Typography>
        </Grid>
        <Grid container justifyContent="flex-end">
          <IconButton
            style={{ color: "#0ced13" }}
            onClick={() => handleMenuCloseAvisos(aviso)}
          >
            <CheckCircleOutline color="inherit" />
          </IconButton>
        </Grid>
      </MenuItem>
    );
  };

  return (
    <Grid container item justifyContent="flex-end" xs>
      <IconButton
        aria-label="show 1 new notifications"
        color="inherit"
        onClick={handleMenuOpenAvisos}
      >
        <Badge color="error" badgeContent={totalAvisosNaoVistos?.length}>
          <Notifications />
        </Badge>
      </IconButton>
      <IconButton color="inherit">
        <ExitToApp />
      </IconButton>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <Avatar className={classes.avatar}>T</Avatar>
      </IconButton>
      <MenuAccount />
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
