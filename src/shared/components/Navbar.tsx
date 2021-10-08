import {
  AppBar,
  Avatar,
  Badge,
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import { Chat, ExitToApp, Notifications } from "@material-ui/icons";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Usuario } from "../../model/usuario.model";
import { OauthService } from "../../service/oauth.service";
import { UsuarioService } from "../../service/usuario.service";
import { Messages } from "../messages/validation-messages";
import { EndNavbar } from "./EndNavbar";
import { SearchUserAutocomplete } from "./SearchUserAutocomplete";
import Toast from "./Toast";

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    }
  })
);

const Navbar = () => {
  const classes = useStyles();
  const oauthService = new OauthService();
  const usuarioService = new UsuarioService();

  const history = useHistory();

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    severity: "success",
  });
  const [userPrincipal, setUserPrincipal] = useState<Usuario>(null);

  useEffect(() => {
    usuarioService
      .findById(oauthService.userFromToken.id)
      .then((response) => setUserPrincipal(response.data));
  }, []);

  const onAddContato = () => {
    setToast({ ...toast, open: true, msg: Messages.MSG006 });
  };

  return (
    <div>
      <Toast
        open={toast.open}
        duration={3000}
        position={{ vertical: "top", horizontal: "right" }}
        severity={toast.severity}
        message={toast.msg}
        handleClose={() => setToast({ ...toast, open: false })}
      />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, classes.appBarShift)}
      >
        <Toolbar>
          <Grid container direction="row" alignItems="center" spacing={2}>
            <Grid item>
              <Typography variant="h6" className={classes.title}>
                <b>Easychat</b>
              </Typography>
            </Grid>
            <Grid item>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => history.push("/home")}
              >
                <Chat />
              </IconButton>
            </Grid>
            <Grid>
              <SearchUserAutocomplete
                userPrincipal={userPrincipal}
                onAddContato={onAddContato}
              />
            </Grid>
            <EndNavbar />
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
