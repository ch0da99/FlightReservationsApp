import * as types from "./actionTypes";

export const customerAllReservationsSuccess = (reservations) => {
  return { type: types.CUSTOMER_ALL_RESERVATIONS_SUCCESS, reservations };
};

export const approvedReservationSuccess = (id) => {
  return { type: types.USER_RESERVATION_APPROVED_SUCCESS, id };
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
