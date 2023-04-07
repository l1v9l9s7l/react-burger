import { Route, Redirect } from "react-router-dom";
import { uploadUserData } from "../../utils/api";
import { useEffect, useState } from "react";
import { getCookie } from "../../utils/utils";
import { useDispatch } from "react-redux";
import { AUTH_CHECK } from "../../services/actions/userAction";
import { useSelector } from "react-redux";

const ProtectedRouteElement = ({ authNeed, children, ...rest }) => {
  const authChecked = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const accessToken = getCookie("accessToken");

  useEffect(() => {
    if (accessToken) {
      if (accessToken.length > 5) {
        uploadUserData(accessToken).then((res) => {
          dispatch({ type: AUTH_CHECK, payload: res.success });
        });
      }
    }
  }, []);

  useEffect(() => {
    console.log(authChecked);
  }, []);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authNeed ? (
          authChecked ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        ) : !authChecked ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRouteElement;
