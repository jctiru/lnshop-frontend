import axios from "axios";

export const createOrderApi = (
  authToken,
  stripeTokenId,
  addressArgs,
  cartItems
) => {
  return axios({
    url: "/orders",
    method: "post",
    data: { stripeTokenId, addressArgs, cartItems },
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });
};

export const getOrdersApi = (authority, authToken, urlParams) => {
  return axios({
    url: `/orders${authority === "ADMIN" ? "/admin" : ""}${
      urlParams ? urlParams : ""
    }`,
    method: "get",
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });
};
