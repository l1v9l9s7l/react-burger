export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

export function setCurrentPage(currentPage) {
  return function (dispatch) {
    dispatch({
      type: SET_CURRENT_PAGE,
      payload: currentPage,
    });
  };
}
