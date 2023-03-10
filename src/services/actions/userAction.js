import { useDispatch } from "react-redux";

export const LOGIN_USER = "LOGIN_USER";
export const UPLOAD_USER = "UPLOAD_USER";

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
    dispatch({
      type: UPLOAD_USER,
      payload: payload,
    });
  };
}

export function setUserAuth(payload) {
  console.log("work");
  return function (dispatch) {
    dispatch({
      type: LOGIN_USER,
      payload: payload,
    });
  };
}
