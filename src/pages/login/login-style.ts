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
    height: "500px",
  },
  button: {
    margin: theme.spacing(),
    width: 200,
  },
}));
