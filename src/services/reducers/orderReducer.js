import { SET_DRAGGED_INGREDIENTS, SET_DRAGGED_BUNS } from "../actions/orderAction";

const defaultState = {
  count: false,
  //Список ингредиентов в конструкторе бургера
  dragIngredients: [],
  dragBuns: [],
  ingredientCount: [],
};

export const orderReducer = (state = defaultState, action) => {
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
        dragIngredients: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
