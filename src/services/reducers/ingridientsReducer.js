import { fetchIngredients } from "../../utils/api"

import {
  CLOSE_INGREDIENT_MODAL,
  GET_MENU_REQUEST,
  GET_MENU_REQUEST_FAILED,
  GET_MENU_REQUEST_FINISH,
  GET_MENU_REQUEST_SUCCESS,
  OPEN_INGREDIENT_MODAL,
} from '../actions/ingridientsAction';

const defaultState = {
  ingridients: [],
  openIngridientModal: false,
  modalDetails: {}
}

export const ingridientsReducer = (state = defaultState, action) => { //Создали редьюсер и задали начальное состояние
  switch (action.type) {

    case GET_MENU_REQUEST_SUCCESS:
      return {
        ...state, ingridients: action.items
      }
      case GET_MENU_REQUEST_FAILED: {
        return {
            ...state,
            items: [],
            itemsRequestFailed: true,
            itemsRequestFailedMessage: action.err
        }
    }
    case GET_MENU_REQUEST_FINISH: {
        return {
            ...state,
            itemsRequest: false
        }
    }
    case GET_MENU_REQUEST: {
        return {
            ...state,
            itemsRequest: true,
            itemsRequestFailed: false,
            itemsRequestFailedMessage: ''
        }
    }
    case OPEN_INGREDIENT_MODAL: {
      return {
        ...state,
        openIngridientModal: true,
        modalDetails: action.payload
      }
    }
    case CLOSE_INGREDIENT_MODAL: {
      return {
        ...state,
        openIngridientModal: false,
        modalDetails: {}
      }
    }
        default:
          return state
  }
}