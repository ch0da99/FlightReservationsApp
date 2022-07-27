import * as types from "./actionTypes";

const customerAllReservationsSuccess = (reservations) => {
  return { type: types.CUSTOMER_ALL_RESERVATIONS_SUCCESS, reservations };
};

const approvedReservationSuccess = (id) => {
  return { type: types.CUSTOMER_RESERVATION_APPROVED_SUCCESS, id };
};

const getAllFlightsSuccess = (flights) => {
  return { type: types.CUSTOMER_ALL_FLIGHTS_SUCCESS, flights };
};

const newFlightCreatedFromAgentSuccess = (flight) => {
  return { type: types.CUSTOMER_NEW_FLIGHT_FROM_AGENT, flight };
};

const getAllCitiesSuccess = (cities) => {
  return { type: types.AGENT_GET_ALL_CITIES_SUCCESS, cities };
};

const cancelFlightSuccess = (id) => {
  return { type: types.CUSTOMER_CANCEL_FLIGHT_FROM_ADMINISTRATOR_SUCCESS, id };
};

const updateTakenSeatsSuccess = (reservation) => {
  return {
    type: types.CUSTOMER_UPDATE_TAKEN_SEATS_ON_FLIGHT_SUCCESS,
    reservation,
  };
};

export const getAllReservationsForCustomer = (reservations) => {
  return async (dispatch) => {
    dispatch(customerAllReservationsSuccess(reservations));
  };
};

export const approvedReservation = (id) => {
  return async (dispatch) => {
    dispatch(approvedReservationSuccess(id));
  };
};

export const getAllFlights = (flights) => {
  return async (dispatch) => {
    dispatch(getAllFlightsSuccess(flights));
  };
};

export const newFlightCreatedFromAgent = (flight) => {
  return async (dispatch) => {
    dispatch(newFlightCreatedFromAgentSuccess(flight));
  };
};

export const getAllCities = (cities) => {
  return async (dispatch) => {
    dispatch(getAllCitiesSuccess(cities));
  };
};

export const cancelFlight = (id) => {
  return async (dispatch) => {
    dispatch(cancelFlightSuccess(id));
  };
};

export const updateTakenSeats = (reservation) => {
  return async (dispatch) => {
    dispatch(updateTakenSeatsSuccess(reservation));
  };
};
