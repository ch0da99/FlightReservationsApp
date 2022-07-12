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

export const approveReservationSuccess = (id) => {
  return { type: types.AGENT_APPROVE_RESERVATION_SUCCESS, id };
};

export const getAllCitiesSuccess = (cities) => {
  return { type: types.AGENT_GET_ALL_CITIES_SUCCESS, cities };
};

export const getAllReservationsForAgent = (result) => {
  console.log(result);
  return async (dispatch) => {
    console.log(result);
    dispatch(agentAllReservationsSuccess(result));
  };
};

export const approveReservation = (id) => {
  return async (dispatch) => {
    dispatch(approveReservationSuccess(id));
  };
};

export const getAllCities = (cities) => {
  console.log(cities)
  return async (dispatch) => {
    dispatch(getAllCitiesSuccess(cities));
  };
};
