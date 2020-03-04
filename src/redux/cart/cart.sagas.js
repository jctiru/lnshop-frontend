import { takeLatest, put, all, call } from "redux-saga/effects";

import { OrderActionTypes } from "../order/order.types";
import { clearCart } from "./cart.actions";

function* clearCartOnCreateOrderSuccess() {
  yield put(clearCart());
}

function* onCreateOrderSuccess() {
  yield takeLatest(
    OrderActionTypes.CREATE_ORDER_SUCCESS,
    clearCartOnCreateOrderSuccess
  );
}

export function* cartSagas() {
  yield all([call(onCreateOrderSuccess)]);
}
