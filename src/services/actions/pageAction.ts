import { FC } from "react";

export const SET_CURRENT_PAGE: "SET_CURRENT_PAGE" = "SET_CURRENT_PAGE";
export const SUCCESS_PASS_RES_REQUEST: "SUCCESS_PASS_RES_REQUEST" = "SUCCESS_PASS_RES_REQUEST";

export function setCurrentPage(currentPage: string) {
  return function (dispatch: FC) {
    dispatch({
      type: SET_CURRENT_PAGE,
      payload: currentPage,
    });
  };
}

export function setPassRequest(state: boolean) {
  return function (dispatch: FC) {
    dispatch({
      type: SUCCESS_PASS_RES_REQUEST,
      payload: state,
    });
  };
}
