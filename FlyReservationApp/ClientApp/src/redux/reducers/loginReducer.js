import * as types from "../actions/actionTypes";
import initialState from "../initialstate";

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_LOGIN_REQUEST:
      return state;
    case types.USER_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.response.data,
      };
    case types.USER_LOGIN_FAILURE:
      return state;
    default:
      return state;
  }
};

export default LoginReducer;
