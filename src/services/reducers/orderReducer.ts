import { SET_DRAGGED_INGREDIENTS, SET_DRAGGED_BUNS } from "../actions/orderAction";
import { TDragIngredients } from "../types/data";


type TOrderState = {
  count: Boolean,
  dragIngredients: TDragIngredients | [],
  dragBuns: TDragIngredients | [];
  ingredientCount: []
};

const defaultState: TOrderState = {
  count: false,
  //Список ингредиентов в конструкторе бургера
  dragIngredients: [],
  dragBuns: [],
  ingredientCount: [],
};

interface IDragIngrAction {
  readonly type: typeof SET_DRAGGED_INGREDIENTS;
  readonly payload: TDragIngredients;
}

interface IDragBunsAction {
  readonly type: typeof SET_DRAGGED_BUNS;
  readonly payload: TDragIngredients;
}

type TDragItemsActions = 
| IDragIngrAction
| IDragBunsAction;


export const orderReducer = (state = defaultState, action: TDragItemsActions) => {
  switch (action.type) {
    case SET_DRAGGED_INGREDIENTS: {
      return {
        ...state,
        dragIngredients: action.payload,
      };
    }
    case SET_DRAGGED_BUNS: {
      return {
        ...state,
        dragBuns: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
