import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {Grid, Typography} from "@material-ui/core";
import FormInput from "../../components/UI/FormInput/FormInput";
import {makeStyles} from "@material-ui/core/styles";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Button from "@material-ui/core/Button";
import {NavLink, useHistory} from "react-router-dom";
import {loginRequest} from "../../store/sagas/usersSaga";
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
  errorAlert: {
    maxWidth: 400
  },
  link:{
    float:'right',
    marginTop:'35px',
    fontSize:'small'
  },
  submitBtn: {
    margin: '5px 0 10px'
  }
})

const SingIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState({
    email:'',
    password:'',
  });

  const onChangeHandler = e => {
    const {name, value} = e.target;

    setUser(prevState => ({
      ...prevState,
      [name]:value
    }));
  };

  const onSubmitHandler = async e => {
    e.preventDefault();
    dispatch(loginRequest( {...user}));
    setTimeout(()=>{
      history.push('/')
    },1500);
  };


  return (
    <Grid container item xs={12} className={classes.mainBlock}>
      <Typography variant='h4' className={classes.title}>
        <PersonAddIcon fontSize='large' color='action'/>
        <br/>
        <strong>sign in</strong>
      </Typography>
      <form onSubmit={onSubmitHandler} className={classes.formBlock}>

        <FormInput
          name={'email'}
          label={'Email'}
          onChange={onChangeHandler}
          required={true}
          value={user.email}/>

        <FormInput
          name={'password'}
          label={'Password'}
          onChange={onChangeHandler}
          required={true}
          value={user.password}
          type={'password'}/>


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
          <NavLink to='/register' className={classes.link}>
            Are you new?
          </NavLink>
        </Grid>
      </form>
    </Grid>
  );
};

export default SingIn;