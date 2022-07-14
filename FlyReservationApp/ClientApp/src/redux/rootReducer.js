import { combineReducers } from "redux";
import LoginReducer from "./reducers/loginReducer";
import AgentReducer from "./reducers/agentReducer";
import CustomerReducer from "./reducers/customerReducer";

const rootReducer = combineReducers({
  LoginReducer,
  AgentReducer,
  CustomerReducer,
});

export default rootReducer;
