import { Grid, Theme, Typography } from "@material-ui/core";
import { QuestionAnswer, QuestionAnswerTwoTone } from "@material-ui/icons";
import { createStyles, makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      marginTop: '20%'
    },
    chatIcon: {
      color: theme.palette.primary.main,
      fontSize: 60
    },
  })
);

export const NoChatSelected = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      justifyContent="center"
      alignContent="center"
      direction="column"
      className={classes.grid}
    >
      <Grid item>
        <QuestionAnswerTwoTone className={classes.chatIcon} />
      </Grid>
      <Grid item>
        <Typography variant="h5">
          Selecione um amigo para iniciar uma conversa maneira.
        </Typography>
      </Grid>
    </Grid>
  );
};
