import * as types from "../actions/actionTypes";
import initialState from "../initialstate";

const AdministratorReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADMINISTRATOR_ALL_FLIGHTS_SUCCESS:
      return {
        ...state,
        flights: action.flights,
      };
    case types.ADMINISTRATOR_CANCEL_FLIGHT_SUCCESS:
      console.log(action.id);
      let index = state.flights?.indexOf(
        state.flights.filter((f) => f.id == action.id)[0]
      );
      return {
        ...state,
        flights:
          state.flights != undefined || state.flights != null
            ? [
                ...state.flights.slice(0, index),
                { ...state.flights[index], canceled: true },
                ...state.flights.slice(index + 1),
              ]
            : [],
      };
    case types.CUSTOMER_NEW_FLIGHT_FROM_AGENT:
      return {
        ...state,
        flights:
          state.flights != null || state.flights != undefined
            ? state.flights[state.flights.length - 1].id != action.flight.id
              ? [...state.flights, action.flight]
              : [...state.flights]
            : [action.flight],
      };
    default:
      return state;
  }
};

export default AdministratorReducer;
