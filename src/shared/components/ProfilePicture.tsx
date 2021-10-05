import { Avatar, createStyles, Grid, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "20px",
    },
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
  })
);

export const ProfilePicture = ({base64} : {base64?: string}) => {
  const classes = useStyle();

  const url = 'https://cdn.myanimelist.net/images/characters/15/422168.jpg';

  return (
    <div className={classes.root}>
      <Grid container justifyContent="center" alignItems="center">
        <div>
          <Avatar
            className={classes.large}
            alt="profile img"
            src={base64}
          />
        </div>
      </Grid>
    </div>
  );
};
