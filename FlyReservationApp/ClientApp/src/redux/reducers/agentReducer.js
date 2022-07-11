import * as types from "../actions/actionTypes";
import initialState from "../initialstate";

const AgentReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case types.AGENT_ALL_RESERVATIONS_REQUEST:
      return state;
    case types.AGENT_ALL_RESERVATIONS_SUCCESS:
      return {
        ...state,
        reservations: action.response,
      };
    case types.AGENT_ALL_RESERVATIONS_FAILURE:
      return state;
    default:
      return state;
  }
};

export default AgentReducer;
