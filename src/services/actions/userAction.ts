// import { useDispatch } from "react-redux";
import { authorization } from "../../utils/api";
import { getCookie } from "../../utils/utils";
import { logOutOnServer } from "../../utils/api";
import { deleteCookie } from "../../utils/utils";
import { forgotPasswordPost } from "../../utils/api";
import { setPassRequest } from "./pageAction";
import { FC } from "react";

export const LOGIN_USER: "LOGIN_USER" = "LOGIN_USER";
export const LOGOUT_USER: "LOGOUT_USER" = "LOGOUT_USER";
export const UPLOAD_USER: "UPLOAD_USER" = "UPLOAD_USER";
export const AUTH_CHECK: "AUTH_CHECK" = "AUTH_CHECK";
export const LOGIN_REQUEST_SUCCESS: "LOGIN_REQUEST_SUCCESS" = "LOGIN_REQUEST_SUCCESS";
export const LOGIN_REQUEST: "LOGIN_REQUEST" = "LOGIN_REQUEST";
export const LOGOUT_REQUEST: "LOGOUT_REQUEST" = "LOGOUT_REQUEST";
export const LOGIN_REQUEST_FAILED: "LOGIN_REQUEST_FAILED" = "LOGIN_REQUEST_FAILED";
export const LOGIN_REQUEST_FINISH: "LOGIN_REQUEST_FINISH" = "LOGIN_REQUEST_FINISH";
export const LOGOUT_REQUEST_FAILED: "LOGOUT_REQUEST_FAILED" = "LOGOUT_REQUEST_FAILED";
export const LOGOUT_REQUEST_FINISH: "LOGOUT_REQUEST_FINISH" = "LOGOUT_REQUEST_FINISH";

export const RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST" = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_REQUEST_SUCCESS: "RESET_PASSWORD_REQUEST_SUCCESS" = "RESET_PASSWORD_REQUEST_SUCCESS";
export const RESET_PASSWORD_REQUEST_FAILED: "RESET_PASSWORD_REQUEST_FAILED" = "RESET_PASSWORD_REQUEST_FAILED";
export const RESET_PASSWORD_REQUEST_FINISH: "RESET_PASSWORD_REQUEST_FINISH" = "RESET_PASSWORD_REQUEST_FINISH";

export function uploadUser(payload: any) {
  return function (dispatch: FC) {
    dispatch({
      type: UPLOAD_USER,
      payload: payload,
    });
  };
}

export function checkAuth(payload: boolean) {
  return function (dispatch: FC) {
    dispatch({
      type: AUTH_CHECK,
      payload: payload,
    });
  };
}

export function logUser(loginInputState: string, passwordInputState: string) {
  return function (dispatch: FC) {
    dispatch({ type: LOGIN_REQUEST });
    authorization(loginInputState, passwordInputState)
      .then((res) => {
        document.cookie = `refreshToken=${res.refreshToken} ; path=/; max-age=12000`;
        document.cookie = `accessToken=${res.accessToken} ; path=/; max-age=12000`;

        dispatch({
          type: LOGIN_USER,
          payload: { email: res.user.email, name: res.user.name, isAuthenticated: true },
        });
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_REQUEST_FAILED,
          err,
        });
      })
      .finally(() => {
        dispatch({
          type: LOGIN_REQUEST_FINISH,
        });
      });
  };
}

export function logoutUser() {
  return function (dispatch: FC) {
    dispatch({ type: LOGOUT_REQUEST });
    const refreshToken = getCookie("refreshToken");
    logOutOnServer(refreshToken)
      .then((res) => {
        if (res.success) {
          deleteCookie();
          dispatch({ type: LOGOUT_USER, payload: { email: "", name: "", isAuthenticated: false } });
        }
      })
      .catch((err) => {
        dispatch({
          type: LOGOUT_REQUEST_FAILED,
          err,
        });
      })
      .finally(() => {
        dispatch({
          type: LOGOUT_REQUEST_FINISH,
        });
      });
  };
}

export function resetPassword(inputState: string, history: any) {
  return function (dispatch: FC) {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    forgotPasswordPost(inputState)
      .then((res) => {
        if (res.success) {
          dispatch(setPassRequest(true));
          history.push({
            pathname: "/reset-password",
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: LOGOUT_REQUEST_FAILED,
          err,
        });
      })
      .finally(() => {
        dispatch({
          type: LOGOUT_REQUEST_FINISH,
        });
      });
  };
}
