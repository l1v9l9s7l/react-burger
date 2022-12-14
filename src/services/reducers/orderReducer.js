import { SET_DRAGGED_INGREDIENTS } from "../actions/orderAction";

const defaultState = {
  count: false,
  //Список ингредиентов в конструкторе бургера
  dragIngredients: [],
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
    default: {
      return state;
    }
  }
};
