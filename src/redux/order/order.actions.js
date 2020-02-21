import { OrderActionTypes } from "./order.types";

export const createOrderStart = stripeTokenIdAndAddressArgs => ({
  type: OrderActionTypes.CREATE_ORDER_START,
  payload: stripeTokenIdAndAddressArgs
});

export const createOrderSuccess = response => ({
  type: OrderActionTypes.CREATE_ORDER_SUCCESS,
  payload: response
});

export const createOrderFailure = error => ({
  type: OrderActionTypes.CREATE_ORDER_FAILURE,
  payload: error
});

export const crudOrderStatusReset = () => ({
  type: OrderActionTypes.CRUD_ORDER_STATUS_RESET
});
