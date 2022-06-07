import { makeStyles, Theme, createStyles } from "@material-ui/core";

const drawerWidth = 300;

export default makeStyles((theme: Theme) =>
createStyles({
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  toolbar: theme.mixins.toolbar,
  contacts: {
    marginTop: "30px",
  },
  main: {
    width: "100%",
    height: "100%",
  },
})
);