import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRouteElement = ({ children, ...rest }) => {
  const cookieRefreshToken = document.cookie.match(
    new RegExp(
      "(?:^|; )" + "refreshToken".replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  const cookieRefreshTokenDecode = cookieRefreshToken
    ? decodeURIComponent(cookieRefreshToken[1])
    : undefined;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        cookieRefreshTokenDecode ? (
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
};

export default ProtectedRouteElement;
