import axios from "axios";
import config from "../config";

export const loginApi = (email, password) => {
  return axios({
    url: `${config.apiUrl}/users/login`,
    method: "post",
    data: { email, password }
  });
};

export const registerApi = (firstName, lastName, email, password) => {
  return axios({
    url: `${config.apiUrl}/users`,
    method: "post",
    data: { firstName, lastName, email, password }
  });
};

export const verifyEmailApi = emailVerificationToken => {
  return axios({
    url: `${config.apiUrl}/users/email-verification?token=${emailVerificationToken}`,
    method: "get"
  });
};

export const requestPasswordResetApi = email => {
  return axios({
    url: `${config.apiUrl}/users/password-reset-request`,
    method: "post",
    data: { email }
  });
};

export const resetPasswordApi = (token, password) => {
  return axios({
    url: `${config.apiUrl}/users/password-reset`,
    method: "post",
    data: { token, password }
  });
};
