import { Route, Redirect } from "react-router-dom";

const ProtectedRouteElement = ({ children, ...rest }) => {
  const cookieUser = document.cookie.match(
    new RegExp("(?:^|; )" + "user".replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
  );

  return (
    <Route
      {...rest}
      render={({ location }) =>
        cookieUser ? (
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
