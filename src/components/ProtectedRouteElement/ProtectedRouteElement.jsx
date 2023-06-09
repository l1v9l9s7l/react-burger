import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRouteElement = ({ authNeed, children, ...rest }) => {
  const authChecked = useSelector((state) => state.user.isAuthenticated);

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
