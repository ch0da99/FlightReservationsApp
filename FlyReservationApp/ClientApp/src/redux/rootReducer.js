import { combineReducers } from "redux";
import LoginReducer from "./reducers/loginReducer";
import AgentReducer from "./reducers/agentReducer";
import CustomerReducer from "./reducers/customerReducer";
import AdministratorReducer from "./reducers/administratorReducer";

const rootReducer = combineReducers({
  LoginReducer,
  AgentReducer,
  CustomerReducer,
  AdministratorReducer,
});

export default rootReducer;
