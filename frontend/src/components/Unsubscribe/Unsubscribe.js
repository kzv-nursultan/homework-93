import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {Button, Grid, Typography} from "@material-ui/core";
import FormInput from "../UI/FormInput/FormInput";
import {unsubscribeRequest} from "../../store/sagas/usersSaga";

const Unsubscribe = () => {
  const dispatch = useDispatch();
  const [friend, setFriend] = useState({
    email: '',
  });

  const onChangeHandler = e => {
    setFriend({email: e.target.value});
  };

  const deleteHandler = () => {
    dispatch(unsubscribeRequest({...friend}));
    setFriend({email: ''});
  }
  return (
    <Grid item>
      <Typography variant='h4'>
        Don't share your Events with friend
      </Typography>

      <FormInput
      label='Insert email'
      name='email'
      fullWidth
      onChange={onChangeHandler}
      value={friend.email}
      />
      <Button
        color='primary'
        variant='outlined'
        onClick={deleteHandler}
        style={{margin: '0 auto', display: 'block'}}>
        delete
      </Button>
    </Grid>
  );
};

export default Unsubscribe;