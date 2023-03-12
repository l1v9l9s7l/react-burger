import { useDispatch } from "react-redux";

export const LOGIN_USER = "LOGIN_USER";
export const UPLOAD_USER = "UPLOAD_USER";
export const AUTH_CHECK = "AUTH_CHECK";

export function setUser(payload) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_USER,
      payload: payload,
    });
  };
}

export function uploadUser(payload) {
  return function (dispatch) {
    console.log("Загрузка пользователя");
    dispatch({
      type: UPLOAD_USER,
      payload: payload,
    });
  };
}

export function checkAuth(payload) {
  return function (dispatch) {
    dispatch({
      type: AUTH_CHECK,
      payload: payload,
    });
  };
}
