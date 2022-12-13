
import {
    SET_DRAGGED_INGREDIENTS,
    SET_DRAGGED_INGREDIENTS_MARKUP,
    SET_ORDER_IDS_ARR,
    OPEN_ORDER_MODAL,
    CLOSE_ORDER_MODAL,
    GET_ORDER_NUMBER
} from "../actions/orderActions";

const defaultState = {
    count: [],
    //Перенесенные ингридиенты
    dragIngredients: [],
    dragIngredientsMarkup: [],
    ingredientCount:[],
    orderIds: [],
    orderNumber: null,
    orderRequest: false,
    orderRequestFailed: false,
    orderRequestFailedMessage: '',
    openOrderModal: false,
    isCanCreateOrder: false
};



export const orderReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_DRAGGED_INGREDIENTS: {
            return {
                ...state,
                dragIngredients: action.payload
            }
        }
        case SET_DRAGGED_INGREDIENTS_MARKUP: {
            return {
                ...state,
                dragIngredientsMarkup: action.payload
            }
        }
        case SET_ORDER_IDS_ARR: {
            return {
                ...state,
                orderIds: action.payload
            }
        }
        case OPEN_ORDER_MODAL: {
            return {
                ...state,
                openOrderModal: true
            }
        }
        case CLOSE_ORDER_MODAL: {
            return {
                ...state,
                openOrderModal: false
            }
        }
        case GET_ORDER_NUMBER: {
            return {
                ...state,
                orderNumber: action.payload
            }
        }
        default: {
            return state;
        }
    }
}