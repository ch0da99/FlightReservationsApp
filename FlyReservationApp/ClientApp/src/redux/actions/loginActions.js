// import * as types from "./actionTypes"
// import * as logIns from "../../../firebase/authentication"

// /**
//  * User Log Out requested.
//  * @returns {{type: string}}
//  */
// export function userLoginRequest() {
// 	return { type: types.USER_LOGIN_REQUEST }
// }

// /**
//  * User successfully Logged In action creator.
//  * @param response
//  * @returns {{response: *, type: string}}
//  */
// export function userLoginSuccess(response) {
// 	return { type: types.USER_LOGIN_SUCCESS, response }
// }

// /**
//  * User Log In failed action creator.
//  * @param error
//  * @returns {{error: *, type: string}}
//  */
// export function userLoginFailure(error) {
// 	return { type: types.USER_LOGIN_FAILURE, error }
// }

// /**
//  * User Log Out requested.
//  * @returns {{type: string}}
//  */
// export function userLogoutRequest() {
// 	return { type: types.USER_LOGOUT_REQUEST }
// }

// /**
//  * User successfully Logged Out action creator.
//  * @param response
//  * @returns {{response: *, type: string}}
//  */
// export function userLogoutSuccess(response) {
// 	return { type: types.USER_LOGOUT_SUCCESS, response }
// }

// /**
//  * User Log Out failed action creator.
//  * @param error
//  * @returns {{error: *, type: string}}
//  */
// export function userLogoutFailure(error) {
// 	return { type: types.USER_LOGOUT_FAILURE, error }
// }

// /**
//  * Fires a firebase request to logIn user via Google account and returns user credentials.
//  * @param params
//  * @returns {function(*): Promise<void>}
//  */
// export function logInUserWithGoogleAccount(token) {
// 	return function (dispatch) {
// 		dispatch(userLoginRequest())
// 		return logIns
// 			.loginWithGoogle(token)
// 			.then((result) => {
// 				dispatch(userLoginSuccess(result))
// 				console.log(result)
// 			})
// 			.catch((error) => {
// 				console.log(error)
// 			})
// 	}
// }

// /**
//  * Fires a firebase request to logIn user via Email account and returns user credentials.
//  * @param params
//  * @returns {function(*): Promise<void>}
//  */
// export function logInUserWithEmailAccount(email, password) {
// 	return function (dispatch) {
// 		dispatch(userLoginRequest())
// 		return logIns
// 			.loginWithEmail(email, password)
// 			.then((result) => {
// 				dispatch(userLoginSuccess(result))
// 			})
// 			.catch((error) => {
// 				console.log(error)
// 			})
// 	}
// }
