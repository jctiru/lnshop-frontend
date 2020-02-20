import axios from "axios";

export const createOrderApi = (authToken, stripeToken, cartItems) => {
  return axios({
    url: "/orders",
    method: "post",
    data: { token: stripeToken, cartItems },
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });
};
