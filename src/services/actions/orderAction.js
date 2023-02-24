export const SET_DRAGGED_INGREDIENTS = "SET_DRAGGED_INGREDIENTS";
export const SET_DRAGGED_BUNS = "SET_DRAGGED_BUNS";

export function setDraggedIngredients(draggedElements) {
  return function (dispatch) {
    dispatch({
      type: SET_DRAGGED_INGREDIENTS,
      payload: draggedElements,
    });
  };
}

export function setDraggedBuns(draggedBuns) {
  return function (dispatch) {
    dispatch({
      type: SET_DRAGGED_BUNS,
      payload: draggedBuns,
    });
  };
}
