import {
  SET_ORDER_IDS_ARR,
  OPEN_ORDER_MODAL,
  CLOSE_ORDER_MODAL,
  GET_ORDER_NUMBER,
} from "../actions/orderDetailsAction";

const defaultState = {
  orderIds: [],
  orderNumber: null,
  openOrderModal: false,
};

export const orderDetailsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_ORDER_IDS_ARR: {
      return {
        ...state,
        orderIds: action.payload,
      };
    }
    case OPEN_ORDER_MODAL: {
      return {
        ...state,
        openOrderModal: true,
      };
    }
    case CLOSE_ORDER_MODAL: {
      return {
        ...state,
        openOrderModal: false,
      };
    }
    case GET_ORDER_NUMBER: {
      return {
        ...state,
        orderNumber: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
