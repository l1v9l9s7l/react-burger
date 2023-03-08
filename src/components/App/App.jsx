import { useEffect } from "react";
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
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import { ForgotPassword } from "../../pages/ForgotPassword/ForgotPassword";
import { ResetPassword } from "../../pages/ResetPassword/ResetPassword";
import { Profile } from "../../pages/Profile/Profile";
import IngridientPage from "../IngredientPage/IngredientPage";
import Modal from "../Modal/Modal";
import IngridientDetails from "../IngridientDetails/IngridientDetails";
import ProtectedRouteElement from "../ProtectedRouteElement/ProtectedRouteElement";
import { ProfileForm } from "../ProfileForm/ProfileForm";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const modalState = useSelector((state) => state.ingredientDetails.openIngridientModal);

  useEffect(() => {
    dispatch(getIngridients());
  }, [dispatch]);

  const handlerModalClose = () => {
    //Создали обработчик открытия модального окна
    dispatch({ type: "CLOSE_ORDER_MODAL" }); //Меняем состояние модального окна
    dispatch({ type: "CLOSE_INGREDIENT_MODAL" }); //Меняем состояние модального окна
    history.goBack();
  };

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
          {/* <Route exact path="/profile"> */}
          <ProtectedRouteElement>
            <Profile>
              <ProfileForm></ProfileForm>
            </Profile>
          </ProtectedRouteElement>
          {/* </Route> */}
          <Route path="/profile/orders">
            <Profile>
              <p>Orders</p>
            </Profile>
          </Route>
          {modalState && ( //Если true отобрази модальное окно
            <Route path="/ingredients/:id">
              <DndProvider backend={HTML5Backend}>
                <BurgerIngridients />
                <BurgerConstructor />
              </DndProvider>
              <Modal onModalClose={handlerModalClose}>
                <IngridientDetails />
              </Modal>
            </Route>
          )}
          {!modalState && (
            <Route path="/ingredients/:id">
              <IngridientPage />
            </Route>
          )}
        </Switch>
      </main>
    </>
  );
}

export default App;
