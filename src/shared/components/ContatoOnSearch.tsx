import {
  Avatar,
  Grid,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { CheckCircleOutline } from "@material-ui/icons";
import { Usuario } from "../../model/usuario.model";
import AddContatoButton from "./AddContatoButton";

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

const ContatoOnSearch: React.FC<{
  option: Usuario;
  handleAddContato: (usuario: Usuario) => void;
}> = ({ option, handleAddContato }) => {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={4}>
        <Avatar className={classes.avatar}>
          <Typography variant="caption">
            {option.dadosPessoais.nome.toUpperCase().substring(0, 2)}
          </Typography>
        </Avatar>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="caption">
          {option.dadosPessoais.username}
        </Typography>
      </Grid>
      <Grid container justifyContent="flex-end">
        {option.added ? (
          <IconButton disabled={true}>
            <CheckCircleOutline color="primary" />
          </IconButton>
        ) : (
          <AddContatoButton
            option={option}
            handleAddContato={handleAddContato}
          />
        )}
      </Grid>
    </>
  );
};

export default ContatoOnSearch;
