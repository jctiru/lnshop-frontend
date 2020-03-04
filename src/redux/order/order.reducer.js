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
    case OrderActionTypes.GET_ORDERS_START:
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
    case OrderActionTypes.GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        isCrudOrderLoading: false,
        error: null
      };
    case OrderActionTypes.GET_ORDERS_FAILURE:
      return {
        ...state,
        orders: { totalPages: 0, orders: [] },
        isCrudOrderLoading: false,
        error: action.payload
      };
    case OrderActionTypes.CREATE_ORDER_FAILURE:
      return {
        ...state,
        isCrudOrderLoading: false,
        isCrudOrderSuccess: false,
        error: action.payload
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
