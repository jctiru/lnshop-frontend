import { takeLatest, put, all, call, select } from "redux-saga/effects";

import { OrderActionTypes } from "./order.types";
import { createOrderSuccess, createOrderFailure } from "./order.actions";
import { createOrderApi } from "../api/order.api";

const getToken = state => state.user.currentUser.token;
const getCartItems = state => state.cart.cartItems;

function* createOrder({ payload: { stripeToken } }) {
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
      stripeToken,
      cartItemsObj
    );
    yield put(createOrderSuccess(data));
  } catch (error) {
    yield put(createOrderFailure(error.response.data));
  }
}

function* onCreateOrderStart() {
  yield takeLatest(OrderActionTypes.CREATE_ORDER_START, createOrder);
}

export function* orderSagas() {
  yield all([call(onCreateOrderStart)]);
}
