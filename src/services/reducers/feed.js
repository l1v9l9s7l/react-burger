import {
    WS_FEED_CONNECTION_CLOSED,
    WS_FEED_CONNECTION_ERROR,
    WS_FEED_CONNECTION_SUCCESS,
    WS_FEED_GET_MESSAGE
} from "../actions/feed";


const initialState = { wsConnected: false, orders: [], total: 0, totalToday: 0 };

export const wsFeedReducer = (state = initialState, action) => {
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