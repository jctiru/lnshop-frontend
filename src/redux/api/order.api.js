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
