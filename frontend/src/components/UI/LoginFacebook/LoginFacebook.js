import React from 'react';
import {useDispatch} from "react-redux";
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props';
import {Button} from "@material-ui/core";
import FacebookIcon from '@material-ui/icons/Facebook';
import {facebookLoginRequest} from "../../../store/sagas/usersSaga";

const FacebookLogin = () => {
  const dispatch = useDispatch();

  const facebookResponse = response => {
    if (response.id) {
      dispatch(facebookLoginRequest(response));
    }
  };

  return (
    <FacebookLoginButton
      appId="138749144905204"
      fields="name,email,picture"
      render={props => (
        <Button
          fullWidth
          color="primary"
          variant="outlined"
          startIcon={<FacebookIcon/>}
          onClick={props.onClick}
        >
          Login with Facebook
        </Button>
      )}
      callback={facebookResponse}
    />
  );
};

export default FacebookLogin