import * as types from "../actions/actionTypes";
import initialState from "../initialstate";

const CustomerReducer = (state = initialState, action) => {
  console.log(state);
  switch (action.type) {
    case types.CUSTOMER_ALL_RESERVATIONS_SUCCESS:
      return {
        ...state,
        reservations: action.reservations,
      };
    case types.CUSTOMER_RESERVATION_APPROVED_SUCCESS:
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
    case types.CUSTOMER_ALL_FLIGHTS_SUCCESS:
      return {
        ...state,
        flights: action.flights,
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
    case types.AGENT_GET_ALL_CITIES_SUCCESS:
      return {
        ...state,
        cities: action.cities,
      };
    case types.CUSTOMER_CANCEL_FLIGHT_FROM_ADMINISTRATOR_SUCCESS:
      let indexF = state.flights.indexOf(
        state.flights.filter((f) => f.id == action.id)[0]
      );
      let indexR = state.reservations?.indexOf(
        state.reservations.filter((r) => r.flight.id == action.id)[0]
      );
      console.log(state.flights);
      console.log(action.id);
      console.log(indexF);
      console.log(indexR);
      return {
        ...state,
        flights:
          indexF != undefined && indexF != null && indexF > -1
            ? state.flights != undefined && state.flights != null
              ? [
                  ...state.flights.slice(0, indexF),
                  ...state.flights.slice(indexF + 1),
                ]
              : []
            : state.flights,
        reservations:
          indexR != undefined && indexR != null && indexR > -1
            ? state.reservations != undefined && state.reservations != null
              ? [
                  ...state.reservations.slice(0, indexR),
                  {
                    ...state.reservations[indexR],
                    flight: {
                      ...state.reservations[indexR].flight,
                      canceled: true,
                    },
                  },
                  ...state.reservations.slice(indexR + 1),
                ]
              : []
            : state.reservations,
      };
    default:
      return state;
  }
};

export default CustomerReducer;
