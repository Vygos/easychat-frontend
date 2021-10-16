import {
  MenuItem,
  Grid,
  Avatar,
  Typography,
  IconButton,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import { CheckCircleOutline } from "@material-ui/icons";
import { Avisos } from "../../model/avisos.model";

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

export const PedidoAmizadeAviso = ({
  aviso,
  handleMenuCloseAvisos,
}: {
  aviso: Avisos;
  handleMenuCloseAvisos: (aviso: Avisos) => void;
}) => {
  const classes = useStyles();

  const { nome, username } = aviso?.contato?.dadosPessoais;
  const { descricao } = aviso;

  return (
    <MenuItem>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Avatar className={classes.avatar}>
            <Typography variant="caption">
              {nome?.toUpperCase().substring(0, 2)}
            </Typography>
          </Avatar>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption">
            {username} {descricao}
          </Typography>
        </Grid>
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
