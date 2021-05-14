import {put, takeEvery} from 'redux-saga/effects';
import axiosUrl from "../../axiosUrl";
import eventsSlice from "../slices/eventsSlice";
import {NotificationManager} from "react-notifications";

export const {
  getRequest,
  getSuccess,
  getFailure,
  postRequest,
  postSuccess,
  postFailure,
  deleteRequest,
  deleteSuccess,
  deleteFailure,
} = eventsSlice.actions

export function* getEvents() {
  try {
    const response = yield axiosUrl.get('/events');
    yield put(getSuccess(response.data));
  } catch (e) {
    yield put(getFailure(e));
    NotificationManager.error(e.message);
  }
};

export function* postEvent({payload: data}) {
  try {
    const response = yield axiosUrl.post('/events', data);
    yield put(postSuccess(response.data));
    NotificationManager.success('Event successfully created');
  } catch (e) {
    yield put(postFailure(e));
    NotificationManager.error(e.message);
  }
};

export function* deleteEvent({payload: id}) {
  try {
    yield axiosUrl.delete('/events/' + id);
    yield put(deleteSuccess(id));
    NotificationManager.success('Deleted');
  } catch (e) {
    yield put(deleteFailure(e));
    NotificationManager.error(e.message);
  }
}

const eventsSaga = [
  takeEvery(getRequest, getEvents),
  takeEvery(postRequest, postEvent),
  takeEvery(deleteRequest, deleteEvent),
];

export default eventsSaga;