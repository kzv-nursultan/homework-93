import {createSlice} from "@reduxjs/toolkit";
const today = new Date().toJSON().slice(0,10).split('-').reverse().join('-');

const initialState = {
  eventLoading: false,
  events: [],
  getError: null,
  postError: null,
  deleteError: null,
};

const name = 'events';

const eventSlices = createSlice({
  name,
  initialState,
  reducers: {
    getRequest: state => {
      state.eventLoading = true;
    },
    getSuccess:  (state, {payload: events}) => {
      state.events = events;
      state.eventLoading = false;
    },
    getFailure: (state,{payload: error}) => {
      state.eventLoading = false;
      state.getError = error;
    },
    postRequest: state => {
      state.eventLoading = true;
    },
    postSuccess: (state, {payload: events}) => {
      state.eventLoading = false;
      state.events = [...state.events, events];
    },
    postFailure: (state, {payload: error}) => {
      state.postError = error;
      state.eventLoading = false;
    },
    deleteRequest: state => {
      state.eventLoading = true;
    },
    deleteSuccess: (state, {payload: id}) => {
      state.events = state.events.filter(events => events._id !== id);
      state.eventLoading = false;
    },
    deleteFailure: (state, {payload: error}) => {
      state.deleteError = error;
    },
  }
});

export default eventSlices;