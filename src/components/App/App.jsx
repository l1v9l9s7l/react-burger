import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader.jsx";
import BurgerIngridients from "../BurgerIngridients/BurgerIngridients.jsx";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.jsx";
import { getIngridients } from "../../services/actions/ingridientsAction";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Login } from "../../pages/Login/Login";
import { Register } from "../../pages/Register/Register";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import { ForgotPassword } from "../../pages/ForgotPassword/ForgotPassword";
import { ResetPassword } from "../../pages/ResetPassword/ResetPassword";
import { Profile } from "../../pages/Profile/Profile";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location.state);

  useEffect(() => {
    dispatch(getIngridients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <Switch>
          <Route path="/" exact>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngridients />
              <BurgerConstructor />
            </DndProvider>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/reset-password">
            <ResetPassword />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
