import { createStyles, Drawer, List, makeStyles } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      overflowX: "hidden",
    },
    drawerPaper: {
      width: drawerWidth,
      //   zIndex: 0
    },
    list: {
      marginTop: "120px",
    },
  })
);

const SideBar = ({ ...props }) => {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      anchor="left"
      open={true}
      variant="persistent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <List className={classes.list}>{props.children}</List>
    </Drawer>
  );
};

export default SideBar;
