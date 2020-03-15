import axios from "axios";

export const loginApi = (email, password) => {
  return axios({
    url: "/users/login",
    method: "post",
    data: { email, password }
  });
};

export const registerApi = (firstName, lastName, email, password) => {
  return axios({
    url: "/users",
    method: "post",
    data: { firstName, lastName, email, password }
  });
};

export const verifyEmailApi = emailVerificationToken => {
  return axios({
    url: `/users/email-verification?token=${emailVerificationToken}`,
    method: "get"
  });
};
