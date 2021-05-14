import React from 'react';
import {Button, Divider, Grid, makeStyles, Paper, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {deleteRequest} from "../../store/sagas/eventsSaga";

const useStyles = makeStyles({
  root: {
    margin: '5px auto',
    display: 'flex',
    flexDirection: "column",
    width: '95%'
  },
  title: {
    margin: 'auto',
  },
  buttonsBlock: {
    display: "flex"
  },
  btns: {
    margin: 5
  }
});

const EventItem = ({name, duration, date, id, author}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const deleteHandler = () => {
    dispatch(deleteRequest(id))
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography variant='h5' className={classes.title}>
        You have <strong>{name}</strong> event which will be at <strong>{date}</strong> and {duration} hours long.
      </Typography>
      <Divider/>
      { user._id === author && (
        <Grid item>
        <Button variant='outlined' className={classes.btns} onClick={deleteHandler}>
        delete
        </Button>
        </Grid>
        )}
    </Paper>
  );
};

export default EventItem;