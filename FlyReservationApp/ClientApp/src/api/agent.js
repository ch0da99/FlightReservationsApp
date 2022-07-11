import { base_url } from "./apiConfig";

export const getAllReservationsForAgent = () => {
  return axios({
    method: "GET",
    url: `${base_url}/agentAllReservations`,
  });
};
