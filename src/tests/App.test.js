import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "../store/configureStore";
import AppRouter from "../components/App";

it("renders without crashing", () => {
  const store = configureStore();

  const jsx = (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );

  const div = document.createElement("div");
  ReactDOM.render(jsx, div);
  ReactDOM.unmountComponentAtNode(div);
});
