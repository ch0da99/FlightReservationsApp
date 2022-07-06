import { combineReducers } from "redux";
import loginReducer from "./reducers/loginReducer";

const rootReducer = combineReducers({ loginReducer });

export default rootReducer;
