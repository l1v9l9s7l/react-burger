import {
  GET_MENU_REQUEST,
  GET_MENU_REQUEST_FAILED,
  GET_MENU_REQUEST_FINISH,
  GET_MENU_REQUEST_SUCCESS,
} from "../actions/ingridientsAction";

const defaultState = {
  //Список всех полученных ингредиентов
  ingridients: [],
  itemsRequest: null,
  itemsRequestFailed: null,
  itemsRequestFailedMessage: null,
};

export const ingredientsReducer = (state = defaultState, action) => {
  //Создали редьюсер и задали начальное состояние
  switch (action.type) {
    case GET_MENU_REQUEST_SUCCESS:
      return {
        ...state,
        ingridients: action.items,
      };
    case GET_MENU_REQUEST_FAILED: {
      return {
        ...state,
        items: [],
        itemsRequestFailed: true,
        itemsRequestFailedMessage: action.err,
      };
    }
    case GET_MENU_REQUEST_FINISH: {
      return {
        ...state,
        itemsRequest: false,
      };
    }
    case GET_MENU_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
        itemsRequestFailed: false,
        itemsRequestFailedMessage: "",
      };
    }
    default:
      return state;
  }
};
