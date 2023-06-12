import { FC } from "react";
import { TDragIngredients } from "../types/data";

export const SET_DRAGGED_INGREDIENTS: "SET_DRAGGED_INGREDIENTS" = "SET_DRAGGED_INGREDIENTS";
export const SET_DRAGGED_BUNS: "SET_DRAGGED_BUNS" = "SET_DRAGGED_BUNS";

export function setDraggedIngredients(draggedElements: TDragIngredients) {
  return function (dispatch: FC) {
    dispatch({
      type: SET_DRAGGED_INGREDIENTS,
      payload: draggedElements,
    });
  };
}

export function setDraggedBuns(draggedBuns: TDragIngredients) {
  return function (dispatch: FC) {
    dispatch({
      type: SET_DRAGGED_BUNS,
      payload: draggedBuns,
    });
  };
}
