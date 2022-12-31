export const SET_DRAGGED_INGREDIENTS = "SET_DRAGGED_INGREDIENTS";

export function setDraggedIngredients(draggedElements) {
  return function (dispatch) {
    dispatch({
      type: SET_DRAGGED_INGREDIENTS,
      payload: draggedElements,
    });
  };
}
