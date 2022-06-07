import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Conversa } from "../../model/conversa.model";
import {
  cleanBadge,
  conversasSelector,
  ConversasState,
  selectConversa,
} from "../../redux/slices/conversas/conversasSlice";
import { Contato } from "./Contato";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    contacts: {
      marginTop: "30px",
    },
  })
);

const Contatos: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { conversas, conversaAtual } = useSelector(
    conversasSelector
  ) as ConversasState;

  const handleSelectConversa = (conversa: Conversa) => {
    dispatch(selectConversa(conversa));
    dispatch(cleanBadge(conversa));
  };

  return (
    <div className={classes.contacts}>
      {conversas &&
        conversas.map((conversa, index) => (
          <div key={index} onClick={() => handleSelectConversa(conversa)}>
            <Contato
              conversa={conversa}
              selected={conversa.id === conversaAtual?.id}
            />
          </div>
        ))}
    </div>
  );
};

export default Contatos;
