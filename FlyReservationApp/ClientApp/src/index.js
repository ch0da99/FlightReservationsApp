import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider as ReduxProvider } from "react-redux";
import ConfigureStore from "./redux/configureStore";
import initialState from "./redux/initialstate";

const store = ConfigureStore(initialState);

ReactDOM.render(
  <BrowserRouter>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
