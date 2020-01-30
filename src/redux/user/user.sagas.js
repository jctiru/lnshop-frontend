import { takeLatest, put, all, call, select } from "redux-saga/effects";

import { UserActionTypes } from "./user.types";
import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure
} from "./user.actions";
import { loginApi } from "../api/user.api";
import { selectCurrentUser } from "./user.selectors";

function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { data } = yield call(loginApi, email, password);
    yield put(signInSuccess(data));
  } catch (error) {
    yield put(signInFailure(error.response.data));
  }
}

function* isUserAuthenticated() {
  const state = yield select();
  const currentUser = yield selectCurrentUser(state);

  if (currentUser) {
    yield put(signInSuccess(currentUser));
  }
}

function* signOut() {
  yield put(signOutSuccess());
}

function* signUp({ payload: { email, password, displayName } }) {
  // try {
  //   const { user } = yield auth.createUserWithEmailAndPassword(email, password);
  //   yield put(signUpSuccess({ user, additionalData: { displayName } }));
  // } catch (error) {
  //   yield put(signUpFailure(error));
  // }
}

function* signInAfterSignUp({ payload: { user, additionalData } }) {
  // yield getSnapshotFromUserAuth(user, additionalData);
}

function* onSignInStart() {
  yield takeLatest(UserActionTypes.SIGN_IN_START, signInWithEmail);
}

function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
  yield all([
    call(onSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess)
  ]);
}
