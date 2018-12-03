import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./store/configureStore";
import AppRouter from "./routers/App";
import * as serviceWorker from './serviceWorker';
import './styles/styles.scss';
import { CookiesProvider } from 'react-cookie';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <CookiesProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </CookiesProvider>
  </Provider>
);


ReactDOM.render(jsx, document.querySelector("#app"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
