import { takeLatest, put, all, call, select } from "redux-saga/effects";

import { OrderActionTypes } from "./order.types";
import {
  createOrderSuccess,
  createOrderFailure,
  getOrdersSuccess,
  getOrdersFailure,
  getOrderSuccess,
  getOrderFailure
} from "./order.actions";
import { createOrderApi, getOrdersApi, getOrderApi } from "../api/order.api";

const getToken = state => state.user.currentUser.token;
const getCartItems = state => state.cart.cartItems;

function* createOrder({ payload: { stripeTokenId, addressArgs } }) {
  try {
    const authToken = yield select(getToken);
    const cartItems = yield select(getCartItems);
    const cartItemsObj = cartItems.reduce((acc, cv) => {
      acc[cv.lightNovelId] = cv.cartQuantity;
      return acc;
    }, {});
    const { data } = yield call(
      createOrderApi,
      authToken,
      stripeTokenId,
      addressArgs,
      cartItemsObj
    );
    yield put(createOrderSuccess(data));
  } catch (error) {
    yield put(createOrderFailure(error.response.data));
  }
}

function* getOrders({ payload: { authority, urlParams } }) {
  try {
    const authToken = yield select(getToken);
    const { data } = yield call(getOrdersApi, authority, authToken, urlParams);
    yield put(getOrdersSuccess(data));
  } catch (error) {
    yield put(getOrdersFailure(error.response.data));
  }
}

function* getOrder({ payload: { orderId } }) {
  try {
    const authToken = yield select(getToken);
    const { data } = yield call(getOrderApi, authToken, orderId);
    yield put(getOrderSuccess(data));
  } catch (error) {
    yield put(getOrderFailure(error.response.data));
  }
}

function* onCreateOrderStart() {
  yield takeLatest(OrderActionTypes.CREATE_ORDER_START, createOrder);
}

function* onGetOrdersStart() {
  yield takeLatest(OrderActionTypes.GET_ORDERS_START, getOrders);
}

function* onGetOrderStart() {
  yield takeLatest(OrderActionTypes.GET_ORDER_START, getOrder);
}

export function* orderSagas() {
  yield all([
    call(onCreateOrderStart),
    call(onGetOrdersStart),
    call(onGetOrderStart)
  ]);
}
