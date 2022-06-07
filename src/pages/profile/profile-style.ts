import { makeStyles, Theme } from "@material-ui/core";

export default makeStyles((theme: Theme) => ({
  card: {
    width: theme.spacing(110),
  },
  inputFile: {
    display: "none",
  },
  input: {
    width: theme.spacing(40),
  },
}));
