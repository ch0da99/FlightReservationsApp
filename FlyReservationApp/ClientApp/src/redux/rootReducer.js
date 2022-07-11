import { combineReducers } from "redux";
import LoginReducer from "./reducers/loginReducer";
import AgentReducer from "./reducers/agentReducer";

const rootReducer = combineReducers({ LoginReducer, AgentReducer });

export default rootReducer;
