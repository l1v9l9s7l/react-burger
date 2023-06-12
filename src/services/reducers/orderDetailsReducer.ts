import {
  SET_ORDER_IDS_ARR,
  OPEN_ORDER_MODAL,
  CLOSE_ORDER_MODAL,
  GET_ORDER_NUMBER,
} from "../actions/orderDetailsAction";

type TOrderDetailsState = {
  orderIds: number[],
  orderNumber: null | number,
  openOrderModal: boolean
};

const defaultState: TOrderDetailsState = {
  orderIds: [],
  orderNumber: null,
  openOrderModal: false,
};

interface ISetIdsArr {
  readonly type: typeof SET_ORDER_IDS_ARR;
  readonly payload: number[]
}

interface IOpenOrderModal {
  readonly type: typeof OPEN_ORDER_MODAL;
}

interface ICloseOrderModal {
  readonly type: typeof CLOSE_ORDER_MODAL;
}

interface IGetOrderNumber {
  readonly type: typeof GET_ORDER_NUMBER;
  readonly payload: number;
}


type TOrderModalDetailsActions =
|ISetIdsArr
|IOpenOrderModal
|ICloseOrderModal
|IGetOrderNumber

export const orderDetailsReducer = (state = defaultState, action: TOrderModalDetailsActions) : TOrderDetailsState => {
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
