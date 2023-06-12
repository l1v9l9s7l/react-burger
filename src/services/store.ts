import { rootReducer } from "./reducers/rootReducer";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { socketMiddleware } from "./middleware/socketMiddleware";
import { configureStore } from '@reduxjs/toolkit';
import { RootState } from "./types";
import {
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_GET_MESSAGE,
  WS_FEED_SEND_MESSAGE,
} from "./actions/feed";

import {
  WS_CREATED_ORDERS_CONNECTION_CLOSED,
  WS_CREATED_ORDERS_CONNECTION_ERROR,
  WS_CREATED_ORDERS_CONNECTION_START,
  WS_CREATED_ORDERS_CONNECTION_SUCCESS,
  WS_CREATED_ORDERS_GET_MESSAGE,
  WS_CREATED_ORDERS_SEND_MESSAGE,
} from "./actions/createdOrders";

const feedUrl = "wss://norma.nomoreparties.space/orders/all";
const createdOrdersUrl = "wss://norma.nomoreparties.space/orders";

const wsFeedActions = {
  wsInit: WS_FEED_CONNECTION_START,
  wsSendMessage: WS_FEED_SEND_MESSAGE,
  onOpen: WS_FEED_CONNECTION_SUCCESS,
  onClose: WS_FEED_CONNECTION_CLOSED,
  onError: WS_FEED_CONNECTION_ERROR,
  onMessage: WS_FEED_GET_MESSAGE,
};

const wsCreatedOrdersActions = {
  wsInit: WS_CREATED_ORDERS_CONNECTION_START,
  wsSendMessage: WS_CREATED_ORDERS_SEND_MESSAGE,
  onOpen: WS_CREATED_ORDERS_CONNECTION_SUCCESS,
  onClose: WS_CREATED_ORDERS_CONNECTION_CLOSED,
  onError: WS_CREATED_ORDERS_CONNECTION_ERROR,
  onMessage: WS_CREATED_ORDERS_GET_MESSAGE,
};

// const composeEnhancers =
//   typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

// const enhancer = composeEnhancers(applyMiddleware(thunk));

// const enhancer = composeEnhancers(
//   applyMiddleware(
//     thunk,
//     socketMiddleware(feedUrl, wsFeedActions),
//     socketMiddleware(createdOrdersUrl, wsCreatedOrdersActions, true)
//   )
// );

// export const store = createStore(rootReducer, enhancer);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (thunkMiddleware) =>
      thunkMiddleware({
          serializableCheck: false,
      })
      .concat(socketMiddleware(feedUrl, wsFeedActions))
      .concat(socketMiddleware(createdOrdersUrl, wsCreatedOrdersActions, true))
});
