import axios from "axios";
import config from "../config";

export const createOrderApi = (
  authToken,
  stripeTokenId,
  addressArgs,
  cartItems
) => {
  return axios({
    url: `${config.apiUrl}/orders`,
    method: "post",
    data: { stripeTokenId, addressArgs, cartItems },
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });
};

export const getOrdersApi = (authority, authToken, urlParams) => {
  return axios({
    url: `${config.apiUrl}/orders${authority === "ADMIN" ? "/admin" : ""}${
      urlParams ? urlParams : ""
    }`,
    method: "get",
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });
};

export const getOrderApi = (authToken, orderId) => {
  return axios({
    url: `${config.apiUrl}/orders/${orderId}`,
    method: "get",
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });
};
