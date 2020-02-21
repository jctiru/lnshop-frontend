import { OrderActionTypes } from "./order.types";

const INITIAL_STATE = {
  order: null,
  orders: { totalPages: 0, orders: [] },
  isCrudOrderLoading: false,
  isCrudOrderSuccess: false,
  error: null
};

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrderActionTypes.CREATE_ORDER_START:
      return {
        ...state,
        isCrudOrderLoading: true,
        isCrudOrderSuccess: false,
        error: null
      };
    case OrderActionTypes.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        isCrudOrderLoading: false,
        isCrudOrderSuccess: action.payload,
        error: null
      };
    case OrderActionTypes.CRUD_ORDER_STATUS_RESET:
      return {
        ...state,
        isCrudOrderSuccess: false,
        error: null
      };
    default:
      return state;
  }
};

export default orderReducer;
