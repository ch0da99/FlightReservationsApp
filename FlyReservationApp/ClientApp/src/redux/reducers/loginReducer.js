import * as types from "../actions/actionTypes";
import initialState from "../initialstate";

export default function LoginReducer(state = initialState, action) {
  console.log(state.user);
  switch (action.type) {
    case types.USER_LOGIN_REQUEST:
      return state;
    case types.USER_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.response.user,
      };
    case types.USER_LOGIN_FAILURE:
      return state;
    default:
      return state;
  }
}
