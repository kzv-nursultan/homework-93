import {combineReducers} from "redux";
import usersSlice from "./slices/usersSlice";
import eventsSlice from "./slices/eventsSlice";

const rootReducer = combineReducers({
  users: usersSlice.reducer,
  events: eventsSlice.reducer,
});

export default rootReducer;