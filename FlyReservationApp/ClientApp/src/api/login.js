import axios from "axios";

// login request
export const logIn = (username, pass) => {
  axios({
    method: "POST",
    url: "http://localhost:45417/login",
    data: `username=${username}&password=${pass}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      userRole(response.data.id);
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

const userRole = (userId) => {
  console.log(userId);
  axios({
    method: "GET",
    url: `http://localhost:45417/userType/${userId}`,
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
