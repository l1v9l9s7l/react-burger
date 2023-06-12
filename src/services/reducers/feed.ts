import {
    WS_FEED_CONNECTION_CLOSED,
    WS_FEED_CONNECTION_ERROR,
    WS_FEED_CONNECTION_SUCCESS,
    WS_FEED_GET_MESSAGE
} from "../actions/feed";


const initialState: TFeedState = { wsConnected: false, orders: [], total: 0, totalToday: 0 };

type TFeedState = {
    wsConnected: boolean,
    orders: {
        _id: number,
    }[],
    total: number,
    totalToday: number
}

interface WsFeedConnectionClosed {
    readonly type: typeof WS_FEED_CONNECTION_CLOSED;
}

interface WsFeedConnectionSuccess {
    readonly type: typeof WS_FEED_CONNECTION_SUCCESS;
}

interface WsFeedConnectionMessage {
    readonly type: typeof WS_FEED_GET_MESSAGE;
    readonly payload: TFeedState
}

interface WsFeedConnectionError{
    readonly type: typeof WS_FEED_CONNECTION_ERROR;
}

type TFeedActions = 
| WsFeedConnectionClosed
| WsFeedConnectionSuccess
| WsFeedConnectionMessage
| WsFeedConnectionError;

export const wsFeedReducer = (state = initialState, action: TFeedActions): TFeedState => {
    switch (action.type) {
        case WS_FEED_CONNECTION_SUCCESS: {
            return { ...state, wsConnected: true };
        }
        case WS_FEED_CONNECTION_CLOSED: {
            return { ...state, wsConnected: false };
        }
        case WS_FEED_CONNECTION_ERROR: {
            return { ...state, wsConnected: false };
        }
        case WS_FEED_GET_MESSAGE: {
            const {orders=[], total=0, totalToday=0} = action.payload;
            return { ...state, orders, total, totalToday };
        }
        default: {
            return state
        }
    }
}