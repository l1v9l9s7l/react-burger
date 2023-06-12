import { CLOSE_INGREDIENT_MODAL, OPEN_INGREDIENT_MODAL } from "../actions/ingredientDetailsAction";
import { Reducer } from "redux";

type TIngredientModalState = {
  openIngridientModal: boolean,
  modalDetails: null | [],
};

const defaultState: TIngredientModalState = {
  openIngridientModal: false,
  modalDetails: null,
};

interface IIngrModalOpen {
  readonly type: typeof OPEN_INGREDIENT_MODAL;
  readonly payload: [];
}

interface IIngrModalClose {
  readonly type: typeof CLOSE_INGREDIENT_MODAL;
}

type TIngredientModalActions = 
  | IIngrModalOpen
  | IIngrModalClose;

export const ingredientDetailsReducer = (state = defaultState, action: TIngredientModalActions) : TIngredientModalState => {
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
    default:{
      return state;
    }
  }
};
