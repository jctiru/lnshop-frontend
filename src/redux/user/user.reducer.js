import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  signUpSuccessMessage: null,
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
        signUpSuccessMessage: null,
        error: null
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        signUpSuccessMessage: null,
        error: null
      };
    case UserActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        currentUser: null,
        signUpSuccessMessage: action.payload,
        error: null
      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        currentUser: null,
        signUpSuccessMessage: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
