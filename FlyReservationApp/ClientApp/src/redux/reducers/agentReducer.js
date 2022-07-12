import * as types from "../actions/actionTypes";
import initialState from "../initialstate";

const AgentReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case types.AGENT_ALL_RESERVATIONS_SUCCESS:
      return {
        ...state,
        reservations: action.response,
      };
    case types.AGENT_APPROVE_RESERVATION_SUCCESS:
      let index = state.reservations.indexOf(
        state.reservations.filter((r) => r.id == action.id)[0]
      );
      console.log(index);
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
        cities: action.cities
      }
    default:
      return state;
  }
};

export default AgentReducer;
