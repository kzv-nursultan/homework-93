import React, {useState} from 'react';
import {Grid, makeStyles, Typography} from "@material-ui/core";
import FormInput from "../UI/FormInput/FormInput";
import Button from "@material-ui/core/Button";
import {useDispatch} from "react-redux";
import {shareRequest} from "../../store/sagas/usersSaga";

const useStyles = makeStyles({
  root: {
    margin: '10px 0',
  },
  title: {
    width: '90%',
    textAlign: "center"
  },
  addBtn: {
    margin: '3px auto',
    display: "block"
  }
})
const AddFriend = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [friend, setFriend] = useState({
    email: '',
  });

  const onChangeHandler = e => {
    setFriend({
      email: e.target.value,
    });
  };

  const addHandler = async () => {
    await dispatch(shareRequest({...friend}));
    setFriend({email: ''});
  };

  return (
    <Grid item className={classes.root}>
      <Typography variant='h4' className={classes.title}>
        Share your Events with friends
      </Typography>
      <FormInput
      type='email'
      value={friend.friendEmail}
      name='email'
      label='Add friend email'
      onChange={onChangeHandler}
      />
      <Button
        variant='outlined'
        onClick={addHandler}
        color='primary'
        className={classes.addBtn}>
        Add
      </Button>
    </Grid>
  );
};

export default AddFriend;