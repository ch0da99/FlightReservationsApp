import * as types from "./actionTypes";

export const customerAllReservationsSuccess = (reservations) => {
  return { type: types.CUSTOMER_ALL_RESERVATIONS_SUCCESS, reservations };
};

export const approvedReservationSuccess = (id) => {
  return { type: types.CUSTOMER_RESERVATION_APPROVED_SUCCESS, id };
};

export const getAllFlightsSuccess = (flights) => {
  return { type: types.CUSTOMER_ALL_FLIGHTS_SUCCESS, flights };
};


export const getAllReservationsForCustomer = (reservations) => {
  console.log(reservations);
  return async (dispatch) => {
    dispatch(customerAllReservationsSuccess(reservations));
  };
};

export const approvedReservation = (id) => {
  return async (dispatch) => {
    console.log(id);
    dispatch(approvedReservationSuccess(id));
  };
};

export const getAllFlights = (flights) => {
  console.log(flights)
  return async (dispatch) => {
    dispatch(getAllFlightsSuccess(flights));
  };
};