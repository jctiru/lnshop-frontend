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

export const getOrdersStart = authorityAndPage => ({
  type: OrderActionTypes.GET_ORDERS_START,
  payload: authorityAndPage
});

export const getOrdersSuccess = orders => ({
  type: OrderActionTypes.GET_ORDERS_SUCCESS,
  payload: orders
});

export const getOrdersFailure = error => ({
  type: OrderActionTypes.GET_ORDERS_FAILURE,
  payload: error
});

export const getOrderStart = orderId => ({
  type: OrderActionTypes.GET_ORDER_START,
  payload: orderId
});

export const getOrderSuccess = order => ({
  type: OrderActionTypes.GET_ORDER_SUCCESS,
  payload: order
});

export const getOrderFailure = error => ({
  type: OrderActionTypes.GET_ORDER_FAILURE,
  payload: error
});

export const crudOrderStatusReset = () => ({
  type: OrderActionTypes.CRUD_ORDER_STATUS_RESET
});
