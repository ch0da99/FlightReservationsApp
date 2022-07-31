import * as types from "./actionTypes";
import * as logIns from "../../api/login";
const userLoginRequest = () => {
  return { type: types.USER_LOGIN_REQUEST };
};

const userLoginSuccess = (response) => {
  return { type: types.USER_LOGIN_SUCCESS, response };
};

const userLoginFailure = (error) => {
  return { type: types.USER_LOGIN_FAILURE, error };
};
const userLogoutSuccess = () => {
  return { type: types.USER_LOGOUT_SUCCESS };
};
export const logInUserWithCredentials = (username, password) => {
  return async (dispatch) => {
    dispatch(userLoginRequest());
    return logIns
      .logIn(username, password)
      .then((result) => {
        dispatch(userLoginSuccess(result));
      })
      .catch((error) => {
        dispatch(userLoginFailure(error));
        console.log(error);
      });
  };
};

export const logOutUser = () => {
  return async (dispatch) => {
    dispatch(userLogoutSuccess());
  };
};
