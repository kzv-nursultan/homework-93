import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import store from "./store/configureStore";
import {NotificationContainer} from "react-notifications";
import 'react-notifications/lib/notifications.css';


const app = (
  <Provider store={store}>
    <NotificationContainer/>
    <App/>
  </Provider>
);

ReactDOM.render( app, document.getElementById('root'));
