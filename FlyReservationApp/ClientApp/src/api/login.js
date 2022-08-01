import axios from "axios";
import { base_url } from "./apiConfig";

export const logIn = (username, pass) => {
  return axios({
    method: "POST",
    url: `${base_url}/login`,
    data: `username=${username}&password=${pass}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};
