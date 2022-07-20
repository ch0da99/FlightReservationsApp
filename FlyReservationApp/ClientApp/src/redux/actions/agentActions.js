import * as types from "./actionTypes";

const agentAllReservationsSuccess = (reservations) => {
  return { type: types.AGENT_ALL_RESERVATIONS_SUCCESS, reservations };
};

const approveReservationSuccess = (id) => {
  return { type: types.AGENT_APPROVE_RESERVATION_SUCCESS, id };
};

const getAllCitiesSuccess = (cities) => {
  return { type: types.AGENT_GET_ALL_CITIES_SUCCESS, cities };
};

const newReservationCreatedFromCustomerSuccess = (reservation) => {
  return { type: types.AGENT_NEW_RESERVATION_FROM_CUSTOMER, reservation };
};

const cancelFlightSuccess = (id) => {
  return { type: types.AGENT_CANCEL_FLIGHT_FROM_ADMINISTRATOR_SUCCESS, id };
};

export const getAllReservationsForAgent = (reservations) => {
  return async (dispatch) => {
    dispatch(agentAllReservationsSuccess(reservations));
  };
};

export const approveReservation = (id) => {
  return async (dispatch) => {
    dispatch(approveReservationSuccess(id));
  };
};

export const getAllCities = (cities) => {
  return async (dispatch) => {
    dispatch(getAllCitiesSuccess(cities));
  };
};

export const newReservationCreatedFromCustomer = (reservation) => {
  return (dispatch) => {
    dispatch(newReservationCreatedFromCustomerSuccess(reservation));
  };
};

export const cancelFlight = (id) => {
  return async (dispatch) => {
    dispatch(cancelFlightSuccess(id));
  };
};
