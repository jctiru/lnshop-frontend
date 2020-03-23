import { UserActionTypes } from "./user.types";

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION
});

export const resetError = () => ({
  type: UserActionTypes.RESET_ERROR
});

export const signInStart = emailAndPassword => ({
  type: UserActionTypes.SIGN_IN_START,
  payload: emailAndPassword
});

export const signInSuccess = user => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user
});

export const signInFailure = error => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = error => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error
});

export const signUpStart = userCredentials => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userCredentials
});

export const signUpSuccess = signUpSuccessMessage => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: signUpSuccessMessage
});

export const signUpFailure = error => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error
});

export const emailVerificationStart = emailVerificationToken => ({
  type: UserActionTypes.EMAIL_VERIFICATION_START,
  payload: emailVerificationToken
});

export const emailVerificationSuccess = emailVerificationSuccessMessage => ({
  type: UserActionTypes.EMAIL_VERIFICATION_SUCCESS,
  payload: emailVerificationSuccessMessage
});

export const emailVerificationFailure = error => ({
  type: UserActionTypes.EMAIL_VERIFICATION_FAILURE,
  payload: error
});

export const passwordResetRequestStart = email => ({
  type: UserActionTypes.PASSWORD_RESET_REQUEST_START,
  payload: email
});

export const passwordResetRequestSuccess = passwordResetRequestSuccessMessage => ({
  type: UserActionTypes.PASSWORD_RESET_REQUEST_SUCCESS,
  payload: passwordResetRequestSuccessMessage
});

export const passwordResetRequestFailure = error => ({
  type: UserActionTypes.PASSWORD_RESET_REQUEST_FAILURE,
  payload: error
});

export const passwordResetStart = tokenAndPassword => ({
  type: UserActionTypes.PASSWORD_RESET_START,
  payload: tokenAndPassword
});

export const passwordResetSuccess = passwordResetSuccessMessage => ({
  type: UserActionTypes.PASSWORD_RESET_SUCCESS,
  payload: passwordResetSuccessMessage
});

export const passwordResetFailure = error => ({
  type: UserActionTypes.PASSWORD_RESET_FAILURE,
  payload: error
});

export const crudUserStatusReset = () => ({
  type: UserActionTypes.CRUD_USER_STATUS_RESET
});
