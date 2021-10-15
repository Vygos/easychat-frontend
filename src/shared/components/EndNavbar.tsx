import {
  Avatar,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Theme,
  Typography,
} from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import { AccountCircle, ExitToApp } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { rxStomp } from "../../config/ws/rx-stomp";
import { useAppDispatch } from "../../redux";
import { logout } from "../../redux/slices/usuario/usuarioSlice";
import { OauthService } from "../../service/oauth.service";
import { AvisosNotification } from "./AvisosNotification";

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    backgroundColor: deepOrange[500],
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

export const EndNavbar = () => {
  const classes = useStyles();

  const oauthService = new OauthService();

  const [anchorElAccount, setAnchorElAccount] = useState<HTMLElement>(null);

  const history = useHistory();
  const appDispatch = useAppDispatch;

  const isMenuOpenAccount = Boolean(anchorElAccount);

  const handleMenuClose = () => {
    setAnchorElAccount(null);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAccount(event.currentTarget);
  };

  const handleLogout = () => {
    oauthService.removeToken();
    appDispatch(logout())
    history.push("/login");
    if (rxStomp.stomp.connected()) {
      rxStomp.stomp.deactivate();
    }
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
      <MenuItem onClick={() => history.push("/profile")}>
        <AccountCircle />
        <Typography variant="body1">Perfil</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <Grid container item justifyContent="flex-end" xs>
      <AvisosNotification />
      <IconButton color="inherit" onClick={handleLogout}>
        <ExitToApp />
      </IconButton>
      <IconButton
        edge="end"
        aria-label="logout"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        color="inherit"
      >
        <Avatar className={classes.avatar}>T</Avatar>
      </IconButton>
      <MenuAccount />
    </Grid>
  );
};
