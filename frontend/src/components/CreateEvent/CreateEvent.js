import React, {useState} from 'react';
import {Button, Grid, makeStyles, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import FormInput from "../UI/FormInput/FormInput";
import {postRequest} from "../../store/sagas/eventsSaga";
import AddFriend from "../AddFriend/AddFriend";
import Unsubscribe from "../Unsubscribe/Unsubscribe";

const useStyles = makeStyles({
  formBlock: {
    display: "flex",
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center',
    padding: 10,
    margin: '10px auto'
  }
});

const CreateEvent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const author = useSelector(state => state?.users.user);
  const [newEvent, setNewEvent] = useState({
    author: author._id,
    eventName:'',
    duration: '',
    date: ''
  });

  const onChangeHandler = e => {
    const {name, value} = e.target;
    setNewEvent(prevState => ({
      ...prevState,
      [name]:value
    }));
  };

  const onSubmitHandler = e => {
    e.preventDefault()
    dispatch(postRequest({...newEvent}));
    setNewEvent({
      author: author._id,
      eventName:'',
      duration: '',
      date: ''
    })
  };

  return (
    <Grid item
          className={classes.formBlock}
      component='form'
      onSubmit={onSubmitHandler}>
      <Typography variant='h4'>
        Add new event
      </Typography>

      <FormInput
      required={true}
      name='eventName'
      label='Event Name'
      value={newEvent.eventName}
      onChange={onChangeHandler}
      />

      <FormInput
        required={true}
        name='duration'
        label='Duration'
        value={newEvent.duration}
        onChange={onChangeHandler}
      />

      <FormInput
        required={true}
        name='date'
        label='input in dd-mm-yyyy'
        value={newEvent.date}
        onChange={onChangeHandler}
      />


      <Button
        type='submit'
        variant='outlined'
        color='primary'>
        Send
      </Button>

      <AddFriend/>
      <Unsubscribe/>
    </Grid>
  );
};

export default CreateEvent;