import {put, takeEvery} from 'redux-saga/effects';
import {NotificationManager} from "react-notifications";
import axiosUrl from "../../axiosUrl";
import usersSlice from "../slices/usersSlice";

export const {
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  facebookLoginRequest,
  shareRequest,
  shareSuccess,
  shareFailure,
  unsubscribeRequest,
  unsubscribeSuccess,
  unsubscribeFailure,
} = usersSlice.actions

export function* registerUser({payload: user}) {
  try {
    const response = yield axiosUrl.post('/users', user);
    yield put(registerSuccess(response.data));
    NotificationManager.success('success');
  } catch (error) {
    yield put(registerFailure(error));
    NotificationManager.error(error.message);
  }
}

export function* loginUser({payload: user}) {
  try {
    const response = yield axiosUrl.post('/users/session', user);
    yield put(loginSuccess(response.data));
  } catch (e) {
    yield put(loginFailure(e));
  }
}

export function* loginFacebook({payload: user}) {
  try {
    const response = yield axiosUrl.post('users/facebooklogin', user);
    yield put(loginSuccess(response.data));
    NotificationManager.success('Registered successfully!');
  } catch (e) {
    yield put(loginFailure(e));
    NotificationManager.error(e.message);
  }
}

export function* logout({payload: id}) {
  try {
    yield axiosUrl.delete('/users/session');
    yield put(logoutSuccess());
    NotificationManager.success('Logged out!');
  } catch (e) {
    NotificationManager.error('Could not logout');
  }
}

export function* shareEvents({payload: email}) {
  try {
    yield axiosUrl.post('/users/subscribe', email);
    yield put(shareSuccess());
    NotificationManager.success('You shared your events');
  } catch (e) {
    yield put(shareFailure(e));
    NotificationManager.error(e?.message);
  }
}

export function* deleteFriend({payload: email}) {
  try {
    yield axiosUrl.post('/users/unsubscribe', email);
    yield put(unsubscribeSuccess());
    NotificationManager.success('Deleted!');
  } catch (e) {
    NotificationManager.error(e.message);
    yield put(unsubscribeFailure());
  }
}

const usersSaga = [
  takeEvery(registerRequest, registerUser),
  takeEvery(loginRequest, loginUser),
  takeEvery(facebookLoginRequest, loginFacebook),
  takeEvery(logoutRequest, logout),
  takeEvery(shareRequest, shareEvents),
  takeEvery(unsubscribeRequest, deleteFriend),
];

export default usersSaga;