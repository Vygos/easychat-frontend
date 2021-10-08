import { CircularProgress, Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    outSpinner: {
      zIndex: 9999,
      width: "100vw",
      height: "150vh",
      backgroundColor: "#dbdbdb",
      opacity: 0.7,
      margin: 0,
      padding: 0,
      top: 0,
      bottom: 0,
      position: "absolute",
    },
    insideSpinner: {
      margin: "20% 10%"
    },
  })
);

export const Spinner = ({ ...props }) => {
  const classes = useStyle();

  return (
    <div className={classes.outSpinner}>
      <div className={classes.insideSpinner}>
        <CircularProgress {...props} />
      </div>
    </div>
  );
};
