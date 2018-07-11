import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./app/store/index";
import App from "./app/App";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);


import style from "./main.scss";
