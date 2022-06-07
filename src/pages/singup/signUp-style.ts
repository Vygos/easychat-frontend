import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(3),
      width: 300,
    },
  },
  card: {
    marginTop: "5%",
    width: "40%",
    margin: "5% 0 5%",
  },
  button: {
    margin: theme.spacing(),
    width: 200,
  },
}));
