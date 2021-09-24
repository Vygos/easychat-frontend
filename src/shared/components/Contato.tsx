import {
  Avatar,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  size: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

export const Contato = ({ nome, ...props }: { nome: string }) => {
  const classes = useStyles();

  return (
    <>
      <ListItem button>
        <ListItemIcon>
          <Avatar className={classes.size}>
            <Typography variant="caption">
              {nome && nome.toUpperCase().substring(0, 2)}
            </Typography>
          </Avatar>
        </ListItemIcon>
        <ListItemText primary={nome} />
      </ListItem>
      <Divider />
    </>
  );
};
