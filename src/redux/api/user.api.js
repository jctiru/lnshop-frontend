import axios from "axios";

export const loginApi = (email, password) => {
  return axios({
    url: "/users/login",
    method: "post",
    data: { email, password }
  });
};
