export const SET_DRAGGED_INGREDIENTS = 'SET_DRAGGED_INGREDIENTS';
export const SET_DRAGGED_INGREDIENTS_MARKUP = 'SET_DRAGGED_INGREDIENTS-MARKUP';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_REQUEST_SUCCESS = 'CREATE_ORDER_REQUEST_SUCCESS';
export const CREATE_ORDER_REQUEST_FAILED = 'CREATE_ORDER_REQUEST_FAILED';
export const CREATE_ORDER_REQUEST_FINISH = 'CREATE_ORDER_REQUEST_FINISH';
export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL';
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';
export const GET_ORDER_NUMBER = 'GET_ORDER_NUMBER';
export const MOVE_INGREDIENT_IN_ORDER = 'MOVE_INGREDIENT_IN_ORDER';
export const DELETE_INGREDIENT_FROM_ORDER = 'DELETE_INGREDIENT_FROM_ORDER';


export function setDraggedIngredients(draggedElements){
  return function(dispatch){
      dispatch({
          type: SET_DRAGGED_INGREDIENTS,
          payload: draggedElements
      });
      
          }
  }


export function setDraggedIngredientsMarkup(markup){
  return function(dispatch){
      dispatch({
          type: SET_DRAGGED_INGREDIENTS_MARKUP,
          payload: markup
      });
      
          }
  }
