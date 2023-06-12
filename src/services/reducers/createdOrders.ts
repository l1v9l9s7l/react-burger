import {
  WS_CREATED_ORDERS_CONNECTION_CLOSED,
  WS_CREATED_ORDERS_CONNECTION_ERROR,
  WS_CREATED_ORDERS_CONNECTION_SUCCESS,
  WS_CREATED_ORDERS_GET_MESSAGE,
} from "../actions/createdOrders";
import { TCreatedOrders } from "../types/data";

type TCreatedOrdersState = {
  wsConnected: boolean, 
  orders:  ReadonlyArray<TCreatedOrders>, 
  total: number, 
  totalToday: number,
}

interface IWsGetMes {
  readonly type: typeof WS_CREATED_ORDERS_GET_MESSAGE;
  readonly payload: TCreatedOrders;
}
interface IWsConnectionSuccess {
  readonly type: typeof WS_CREATED_ORDERS_CONNECTION_SUCCESS;
  readonly err: string;
}
interface IWsConnectionClosed {
  readonly type: typeof WS_CREATED_ORDERS_CONNECTION_CLOSED;
}

interface IWsConnectionError {
  readonly type: typeof WS_CREATED_ORDERS_CONNECTION_ERROR;
  readonly items: TCreatedOrders[];
}

type TWsActions = 
  | IWsGetMes
  | IWsConnectionSuccess
  | IWsConnectionClosed
  | IWsConnectionError;


const initialState: TCreatedOrdersState = { 
  wsConnected: false, 
  orders: [], 
  total: 0, 
  totalToday: 0 
};

export const wsCreatedOrdersReducer = (state = initialState, action: TWsActions) => {
  switch (action.type) {
    case WS_CREATED_ORDERS_CONNECTION_SUCCESS: {
      return { ...state, wsConnected: true };
    }
    case WS_CREATED_ORDERS_CONNECTION_CLOSED: {
      return { ...state, wsConnected: false };
    }
    case WS_CREATED_ORDERS_CONNECTION_ERROR: {
      return { ...state, wsConnected: false };
    }
    case WS_CREATED_ORDERS_GET_MESSAGE: {
      const { orders = [], total = 0, totalToday = 0 } = action.payload;
      return { ...state, orders, total, totalToday };
    }
    default: {
      return state;
    }
  }
};
