import {all} from 'redux-saga/effects';
import usersSaga from "./sagas/usersSaga";
import eventsSaga from "./sagas/eventsSaga";

export default function* rootSaga () {
  yield all([
    ...usersSaga,
    ...eventsSaga,
  ])
};