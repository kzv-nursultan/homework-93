import React from 'react';
import {NavLink} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";

const useStyle = makeStyles({
  root: {
    justifyContent: 'space-between',
    display: 'flex',
    boxSizing: "border-box",
  },
  links: {
    color: 'white',
    textDecoration: 'none',
    textTransform: 'uppercase',
    fontSize: 20
  }
});

const ToolBar = () => {
  const classes = useStyle();
  return (
    <Grid item className={classes.root}>
      <NavLink to='/login' className={classes.links}> <strong> Sign in </strong></NavLink>
      <NavLink to='/register' className={classes.links}> <strong> Sign up </strong></NavLink>
    </Grid>
  );
};

export default ToolBar;