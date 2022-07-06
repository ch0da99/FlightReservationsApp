import { applyMiddleware, compose } from "redux";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

export default function ConfigureStore(initialState) {
  const composeEnchancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return configureStore(initialState, rootReducer, applyMiddleware(thunk));
}
