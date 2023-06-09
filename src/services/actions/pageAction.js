export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SUCCESS_PASS_RES_REQUEST = "SUCCESS_PASS_RES_REQUEST";

export function setCurrentPage(currentPage) {
  return function (dispatch) {
    dispatch({
      type: SET_CURRENT_PAGE,
      payload: currentPage,
    });
  };
}

export function setPassRequest(state) {
  return function (dispatch) {
    dispatch({
      type: SUCCESS_PASS_RES_REQUEST,
      payload: state,
    });
  };
}
