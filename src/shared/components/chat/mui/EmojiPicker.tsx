import { Button, makeStyles, Theme } from "@material-ui/core";
import { emojis } from "../emojis";

const useStyles = makeStyles((theme: Theme) => ({
  emojis: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    overflowWrap: "break-word",
    whiteSpace: 'pre-line'
  },
}));

export const EmojiPicker = () => {
  const classes = useStyles();
  const emojisList = emojis;
  return (
    <section className={classes.emojis}>
      {emojisList.map((emoji, index) => (
        <Button key={index}>{emoji}</Button>
      ))}
    </section>
  );
};
