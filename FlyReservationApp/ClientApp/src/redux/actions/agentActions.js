import * as types from "./actionTypes";

export const agentAllReservationsRequest = () => {
  return { type: types.AGENT_ALL_RESERVATIONS_REQUEST };
};

export const agentAllReservationsSuccess = (response) => {
  return { type: types.AGENT_ALL_RESERVATIONS_SUCCESS, response };
};

export const agentAllReservationsFailure = (error) => {
  return { type: types.AGENT_ALL_RESERVATIONS_FAILURE, error };
};

export const getAllReservationsForAgent = (result) => {
  console.log(result);
  return async (dispatch) => {
    console.log(result);
    dispatch(agentAllReservationsSuccess(result));
  };
};
