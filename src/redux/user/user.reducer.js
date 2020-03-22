import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  successMessage: null,
  error: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.RESET_ERROR:
      return {
        ...state,
        error: null
      };
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        successMessage: null,
        error: null
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        successMessage: null,
        error: null
      };
    case UserActionTypes.SIGN_UP_SUCCESS:
    case UserActionTypes.EMAIL_VERIFICATION_SUCCESS:
    case UserActionTypes.PASSWORD_RESET_REQUEST_SUCCESS:
      return {
        ...state,
        currentUser: null,
        successMessage: action.payload,
        error: null
      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
    case UserActionTypes.EMAIL_VERIFICATION_FAILURE:
    case UserActionTypes.PASSWORD_RESET_REQUEST_FAILURE:
      return {
        ...state,
        currentUser: null,
        successMessage: null,
        error: action.payload
      };
    case UserActionTypes.CRUD_USER_STATUS_RESET:
      return {
        ...state,
        successMessage: null,
        error: null
      };
    default:
      return state;
  }
};

export default userReducer;
