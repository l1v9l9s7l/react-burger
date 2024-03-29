import { Route, Redirect } from "react-router-dom";
import { useSelector } from "../../hooks/hooks";

const ProtectedRouteElement = ({ authNeed, children, ...rest }: {authNeed: boolean, children: React.ReactNode, path: string, exact?: boolean}) => {
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
