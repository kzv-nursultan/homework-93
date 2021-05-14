import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  registerError: null,
  loginError: null,
  user: {},
  shareError: null,
};

const name = 'users';

const usersSlice = createSlice({
  name,
  initialState,
  reducers: {
    registerRequest: state => {
      state.loading = true;
    },
    registerSuccess: (state, {payload: user}) => {
      state.user = user;
      state.loading = false;
    },
    registerFailure: (state, {payload: error}) => {
      state.registerError = error;
      state.loading = false;
    },
    loginRequest: state => {
      state.loading = false;
    },
    loginSuccess: (state, {payload: user}) => {
      state.user = user;
      state.loading = false;
    },
    loginFailure: (state, {payload: error}) => {
      state.loginError = error;
    },
    loginFacebook: (state, {payload: user}) => {
      state.user = user;
    },
    logoutSuccess: state => {
      state.user = {};
    },
    facebookLoginRequest: state => {
      state.loading = true;
    },
    logoutRequest: () => {},
    shareRequest: state => {
      state.loading = true;
    },
    shareSuccess: (state) => {
      state.loading = false;
    },
    shareFailure: (state, {payload: error}) => {
      state.shareError = error;
    },
    unsubscribeRequest: state => {
      state.loading = true;
    },
    unsubscribeSuccess: state => {
      state.loading = false;
    },
    unsubscribeFailure: state => {
      state.loading = false;
    }
  }
});

export const { actions } = usersSlice;
export default usersSlice;