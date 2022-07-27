import * as types from "./actionTypes";

const allFlightsSuccess = (flights) => {
  return { type: types.ADMINISTRATOR_ALL_FLIGHTS_SUCCESS, flights };
};

const cancelFlightSuccess = (id) => {
  return { type: types.ADMINISTRATOR_CANCEL_FLIGHT_SUCCESS, id };
};

const newFlightCreatedFromAgentSuccess = (flight) => {
  return { type: types.CUSTOMER_NEW_FLIGHT_FROM_AGENT, flight };
};

const updateTakenSeatsSuccess = (reservation) => {
  return {
    type: types.ADMINISTRATOR_UPDATE_TAKEN_SEATS_ON_FLIGHT_SUCCESS,
    reservation,
  };
};

export const allFlights = (flights) => {
  return async (dispatch) => {
    dispatch(allFlightsSuccess(flights));
  };
};

export const cancelFlight = (id) => {
  return async (dispatch) => {
    dispatch(cancelFlightSuccess(id));
  };
};

export const newFlightCreatedFromAgent = (flight) => {
  return async (dispatch) => {
    dispatch(newFlightCreatedFromAgentSuccess(flight));
  };
};

export const updateTakenSeats = (reservation) => {
  return async (dispatch) => {
    dispatch(updateTakenSeatsSuccess(reservation));
  };
};
