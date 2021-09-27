import {
  Avatar,
  Badge,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Conversa } from "../../model/conversa.model";

const useStyles = makeStyles((theme: Theme) => ({
  size: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  listItem: {
    backgroundColor: "rgb(0, 0, 0, 0.04)",
  },
}));

export const Contato = ({
  conversa,
  selected,
  ...props
}: {
  conversa: Conversa;
  selected: boolean;
}) => {
  const classes = useStyles();

  return (
    <>
      <ListItem className={selected ? classes.listItem : null} button>
        <ListItemIcon>
          <Avatar className={classes.size}>
            <Typography variant="caption">
              {conversa.usuarios[0].dadosPessoais?.nome
                ?.toUpperCase()
                .substring(0, 2)}
            </Typography>
          </Avatar>
        </ListItemIcon>
        <ListItemText primary={conversa.usuarios[0].dadosPessoais?.nome} />
        <Badge color="error" badgeContent={conversa.badge}></Badge>
      </ListItem>
      <Divider />
    </>
  );
};
