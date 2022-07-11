import { HubConnectionBuilder } from "@microsoft/signalr";
import * as actions from "../../redux/actions/agentActions.js";
import { useDispatch } from "react-redux/es/exports.js";

export const connectionSignalR = new HubConnectionBuilder()
  .withUrl("/reservationsHub")
  .build();

// export const requestAllReservationsForAgent = () => {
//   return async (dispatch) => {
//     dispatch(actions.agentAllReservationsRequest());
//     connectionSignalR
//       .on("AllReservations", (reservations) => {
//         console.log(reservations);
//         dispatch(actions.agentAllReservationsSuccess(reservations));
//       })
//       .catch((error) => {
//         console.log(error);
//         dispatch(actions.agentAllReservationsFailure());
//       });
//   };
// };
