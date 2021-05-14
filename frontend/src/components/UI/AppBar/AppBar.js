import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useSelector} from "react-redux";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {NavLink} from "react-router-dom";
import CustomToolbar from "./ToolBar";
import UserBar from "./UserBar";
import {Grid} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textTransform: "uppercase",
    fontWeight: "bold",
    textDecoration: "none",
    color: "white",
  },

  menu: {
    flexGrow: 0.05,
  }
});

const ButtonAppBar = () => {
  const classes = useStyles();
  const user = useSelector(state => state?.users.user);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <NavLink to='/' className = {classes.title}><strong>Calendar</strong></NavLink>
          </Typography>
          <Grid item className={classes.menu}>
            {user.displayName ? <UserBar displayName={user.displayName} avatar={user.avatar}/>
              : <CustomToolbar/>}
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default ButtonAppBar;
