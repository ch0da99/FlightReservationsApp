import * as types from "../actions/actionTypes";
import initialState from "../initialstate";

const AgentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AGENT_ALL_RESERVATIONS_SUCCESS:
      return {
        ...state,
        reservations: action.reservations,
      };
    case types.AGENT_APPROVE_RESERVATION_SUCCESS:
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
    case types.AGENT_GET_ALL_CITIES_SUCCESS:
      return {
        ...state,
        cities: action.cities,
      };
    case types.AGENT_NEW_RESERVATION_FROM_CUSTOMER:
      return {
        ...state,
        reservations:
          state.reservations[state.reservations.length - 1].id !=
          action.reservation.id
            ? [...state.reservations, action.reservation]
            : [...state.reservations],
      };
    case types.AGENT_CANCEL_FLIGHT_FROM_ADMINISTRATOR_SUCCESS:
      const activeReservations = state.reservations;
      activeReservations.map((r) => {
        r.flight.id === action.id ? (r.flight.canceled = true) : r;
      });
      return {
        ...state,
        reservations: [...activeReservations],
      };
    default:
      return state;
  }
};

export default AgentReducer;
