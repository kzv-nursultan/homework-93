import React, {useState} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import {Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {Alert, AlertTitle} from "@material-ui/lab";
import {registerRequest} from "../../store/sagas/usersSaga";
import FormInput from "../../components/UI/FormInput/FormInput";
import LoginFacebook from "../../components/UI/LoginFacebook/LoginFacebook";

const useStyles = makeStyles({
  formBlock: {
    display: 'block',
    margin: '10px auto',
    textAlign: 'center'
  },
  mainBlock: {
    flexDirection:'column',
    textAlign:"center",
  },
  title: {
    textTransform:'uppercase',
    marginTop:10,
  },
  link:{
    float:'right',
    marginTop:'35px',
    fontSize:'small'
  },
  submitBtn:{
    margin: '5px 0 10px'
  }
})

const UserSingUp = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState({
    email:'',
    password:'',
    displayName:'',
    avatarImage:'',
  });
   const error = useSelector(state => state?.users.registerError);
   const newUser = useSelector(state=>state?.users.user);

  const onChangeHandler = e => {
    const {name, value} = e.target;

    setUser(prevState => ({
      ...prevState,
      [name]:value
    }));
  };

  const getFieldError = () => {
    try {
      return error.name;
    } catch (e) {
      return undefined;
    }
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    dispatch(registerRequest({...user}));
    setTimeout(()=>{
      history.push('/')
    },1500);
  };


  return (
    <Grid container item xs={12} className={classes.mainBlock}>
      <Typography variant='h4' className={classes.title}>
        <PersonAddIcon fontSize='large' color='action'/>
        <br/>
        <strong>sign up</strong>
      </Typography>
      <form onSubmit={onSubmitHandler} className={classes.formBlock}>
        {newUser._id && (
          <Grid item>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              You have successfully registered!
            </Alert>
          </Grid>
        )}
        <FormInput
          name='email'
          label='Email'
          type='email'
          onChange={onChangeHandler}
          required={true}
          value={user.email}
          error={getFieldError()}/>

        <FormInput
          name='password'
          label='Password'
          onChange={onChangeHandler}
          required={true}
          value={user.password}
          type='password'
          error={getFieldError('password')}/>

        <FormInput
          name={'displayName'}
          label={'Display Name'}
          onChange={onChangeHandler}
          required={true}
          value={user.displayName}/>

        <FormInput
          name={'avatarImage'}
          label={'Avatar Image'}
          onChange={onChangeHandler}
          value={user.avatarImage}/>

        <Grid container item direction='column'>

          <Button
            type='submit'
            color='primary'
            variant='contained'
            className={classes.submitBtn}>
            Submit
          </Button>

          <LoginFacebook/>

        </Grid>
        <Grid item>
          <NavLink to='/login' className={classes.link}>
            Already registered?
          </NavLink>
        </Grid>
      </form>
    </Grid>
  );
};

export default UserSingUp;