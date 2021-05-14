import createSagaMiddleware from 'redux-saga';
import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import rootSaga from "./rootSaga";
import {initialState} from "./slices/usersSlice";
import axiosUrl from "../axiosUrl";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
  devTools: true,
  preloadedState: loadFromLocalStorage(),
});

sagaMiddleware.run(rootSaga);

store.subscribe(() => {
  saveToLocalStorage({
    users: {
      ...initialState,
      user: store.getState()?.users.user,
    }
  });
});

axiosUrl.interceptors.request.use(config => {
  try {
    config.headers['Authorization'] = store.getState().users.user.token;
  } catch (e) {
    // do nothing, no token exists
  }

  return config;
});

axiosUrl.interceptors.response.use(res => res, e => {
  if (!e.response) {
    e.response = {data: {global: 'No internet'}};
  }

  throw e;
})

export default store;