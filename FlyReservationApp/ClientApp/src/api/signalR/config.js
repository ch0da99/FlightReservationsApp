import { HubConnectionBuilder } from "@microsoft/signalr";
import * as actions from "../../redux/actions/agentActions.js";
import { useDispatch } from "react-redux/es/exports.js";

export const connectionSignalR = new HubConnectionBuilder()
  .withUrl("/reservationsHub")
  .build();
