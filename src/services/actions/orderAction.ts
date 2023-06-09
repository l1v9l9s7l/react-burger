import { FC } from "react";

export const SET_DRAGGED_INGREDIENTS: "SET_DRAGGED_INGREDIENTS" = "SET_DRAGGED_INGREDIENTS";
export const SET_DRAGGED_BUNS: "SET_DRAGGED_BUNS" = "SET_DRAGGED_BUNS";

interface IDragIngr {
  readonly type: typeof SET_DRAGGED_INGREDIENTS;
}

interface IDragBuns {
  readonly type: typeof SET_DRAGGED_INGREDIENTS;
}

type TDragItemsActions = 
| IDragIngr
| IDragBuns;



export function setDraggedIngredients(draggedElements: any[]) {
  return function (dispatch: FC) {
    dispatch({
      type: SET_DRAGGED_INGREDIENTS,
      payload: draggedElements,
    });
  };
}

export function setDraggedBuns(draggedBuns: any[]) {
  return function (dispatch: FC) {
    dispatch({
      type: SET_DRAGGED_BUNS,
      payload: draggedBuns,
    });
  };
}
