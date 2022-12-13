export const SET_DRAGGED_INGREDIENTS = 'SET_DRAGGED_INGREDIENTS';
export const SET_DRAGGED_INGREDIENTS_MARKUP = 'SET_DRAGGED_INGREDIENTS-MARKUP';
export const SET_ORDER_IDS_ARR = 'SET_ORDER_IDS_ARR'
export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL'
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL'
export const GET_ORDER_NUMBER = 'GET_ORDER_NUMBER';

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

export function setOrderIdsArr(orderIds){
    return function(dispatch){
        dispatch({
            type: SET_ORDER_IDS_ARR,
            payload: orderIds
        });
    }
}
