
import {
    ADD_INGREDIENTS,
    OPEN_ORDER_MODAL,
    CLOSE_ORDER_MODAL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_REQUEST_FAILED,
    CREATE_ORDER_REQUEST_FINISH,
    CREATE_ORDER_REQUEST_SUCCESS,
    GET_ORDER_NUMBER,
    DELETE_INGREDIENT_FROM_ORDER,
    MOVE_INGREDIENT_IN_ORDER
} from "../actions/orderActions";


const defaultState = {
    count: 0,
    price: 0,
    bun: {},
    ingredients: [],
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
        case ADD_INGREDIENTS: {
            return {

            }
        }
        case MOVE_INGREDIENT_IN_ORDER: {
            
        }
        case CREATE_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
                orderRequestFailed: false,
                orderRequestFailedMessage: ''
            }
        }
        case CREATE_ORDER_REQUEST_SUCCESS: {
            return {
                price: 0,
                bun: {},
                ingredients: [],
                orderNumber: [],
                ingredientCount:{},
                orderNumber: action.orderNumber,
                orderRequestFailed: false,
                orderRequestFailedMessage: '',
                showOrderModalInfo: true,
                isCanCreateOrder: false
            }
        }
        case CREATE_ORDER_REQUEST_FAILED: {
            return {
                ...state,
                orderRequestFailed: false,
                orderRequestFailedMessage: action.err
            }
        }
        case CREATE_ORDER_REQUEST_FINISH: {
            return {
                ...state,
                orderRequest: false
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
        case DELETE_INGREDIENT_FROM_ORDER: {
            
        }
        default: {
            return state;
        }
    }
}