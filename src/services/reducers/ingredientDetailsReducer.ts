import { CLOSE_INGREDIENT_MODAL, OPEN_INGREDIENT_MODAL } from "../actions/ingredientDetailsAction";

type TIngredientModalState = {
  openIngridientModal: boolean,
  modalDetails: null | []
}

const defaultState: TIngredientModalState = {
  //Список всех полученных ингредиентов
  openIngridientModal: false,
  //Объект просматриваемого ингредиента
  modalDetails: null,
};

interface IIngrModalOpen {
  readonly type: typeof OPEN_INGREDIENT_MODAL;
  readonly payload: TIngredientModalState;
}

interface IIngrModalClose {
  readonly type: typeof CLOSE_INGREDIENT_MODAL;
}

type TIngredientModalActions = 
  | IIngrModalOpen
  | IIngrModalClose;

export const ingredientDetailsReducer = (state = defaultState, action: TIngredientModalActions) => {
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
        modalDetails: null,
      };
    }
    default:
      return state;
  }
};
