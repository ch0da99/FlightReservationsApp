import * as types from "../actions/actionTypes";
import initialState from "../initialstate";

const CustomerReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case types.CUSTOMER_ALL_RESERVATIONS_SUCCESS:
      return {
        ...state,
        reservations: action.reservations,
      };
    case types.USER_RESERVATION_APPROVED_SUCCESS:
      let index = state.reservations.indexOf(
        state.reservations.filter((r) => r.id == action.id)[0]
      );
      return {
        ...state,
        reservations: [
          ...state.reservations.slice(0, index),
          { ...state.reservations[index], approved: true },
          ...state.reservations.slice(index + 1),
        ],
      };
    default:
      return state;
  }
};

export default CustomerReducer;
