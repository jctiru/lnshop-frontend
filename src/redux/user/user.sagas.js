import { takeLatest, put, all, call, select } from "redux-saga/effects";
import { replace } from "redux-first-history";

import { UserActionTypes } from "./user.types";
import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signUpSuccess,
  signUpFailure,
  emailVerificationSuccess,
  emailVerificationFailure
} from "./user.actions";
import { loginApi, registerApi, verifyEmailApi } from "../api/user.api";
import { selectCurrentUser } from "./user.selectors";

function* isUserAuthenticated() {
  const state = yield select();
  const currentUser = yield selectCurrentUser(state);

  if (currentUser) {
    yield put(signInSuccess(currentUser));
  }
}

function* signInWithEmail({ payload: { email, password, from } }) {
  try {
    const { data } = yield call(loginApi, email, password);
    yield put(signInSuccess(data));
    yield put(replace(from));
  } catch (error) {
    yield put(signInFailure(error.response.data));
  }
}

function* signOut() {
  yield put(signOutSuccess());
}

function* signUp({ payload: { firstName, lastName, email, password } }) {
  try {
    yield call(registerApi, firstName, lastName, email, password);
    yield put(
      signUpSuccess(
        "Initial registration complete. Please check your email for email verification."
      )
    );
  } catch (error) {
    yield put(signUpFailure(error.response.data));
  }
}

function* verifyEmail({ payload: { emailVerificationToken } }) {
  try {
    const { data } = yield call(verifyEmailApi, emailVerificationToken);
    yield put(emailVerificationSuccess(data));
  } catch (error) {
    yield put(emailVerificationFailure(error.response.data));
  }
}

function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

function* onSignInStart() {
  yield takeLatest(UserActionTypes.SIGN_IN_START, signInWithEmail);
}

function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

function* onEmailVerificationStart() {
  yield takeLatest(UserActionTypes.EMAIL_VERIFICATION_START, verifyEmail);
}

export function* userSagas() {
  yield all([
    call(onSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onEmailVerificationStart)
  ]);
}
