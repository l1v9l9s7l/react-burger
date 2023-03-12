import { Route, Redirect } from "react-router-dom";
import { uploadUserData } from "../../utils/api";
import { useEffect, useState } from "react";
import { getCookie } from "../../utils/utils";
import { checkAuth } from "../../services/actions/userAction";
import { useDispatch } from "react-redux";
import { AUTH_CHECK } from "../../services/actions/userAction";
import { useSelector } from "react-redux";

const ProtectedRouteElement = ({ authNeed, children, ...rest }) => {
  const authChecked = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  // const [authChecked, setAuthChecked] = useState(false);
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");

  console.log(authNeed);

  useEffect(() => {
    uploadUserData(accessToken).then((res) => {
      dispatch({ type: AUTH_CHECK, payload: res.success });
    });
  }, []);
  if (authChecked) {
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
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }
};

export default ProtectedRouteElement;
