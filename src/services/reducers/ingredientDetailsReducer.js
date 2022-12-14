import { CLOSE_INGREDIENT_MODAL, OPEN_INGREDIENT_MODAL } from "../actions/ingredientDetailsAction";

const defaultState = {
  //Список всех полученных ингредиентов
  openIngridientModal: false,
  //Объект просматриваемого ингредиента
  modalDetails: [],
};

export const ingredientDetailsReducer = (state = defaultState, action) => {
  //Создали редьюсер и задали начальное состояние
  switch (action.type) {
    case OPEN_INGREDIENT_MODAL: {
      return {
        ...state,
        openIngridientModal: true,
        modalDetails: action.payload,
      };
    }
    case CLOSE_INGREDIENT_MODAL: {
      return {
        ...state,
        openIngridientModal: false,
        modalDetails: {},
      };
    }
    default:
      return state;
  }
};
