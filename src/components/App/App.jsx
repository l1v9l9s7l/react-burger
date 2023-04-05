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
import Feed from "../../pages/Feed/Feed";
import Order from "../../pages/Order/Order";
import OrderHistory from "../OrderHistory/OrderHistory";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const modalState = useSelector((state) => state.ingredientDetails.openIngridientModal);

  useEffect(() => {
    dispatch(getIngridients());
  }, [dispatch]);

  const handlerModalClose = () => {
    //Создали обработчик открытия модального окна
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
          <Route path="/feed" exact>
            <Feed />
          </Route>
          <ProtectedRouteElement authNeed={false} path="/login">
            <Login />
          </ProtectedRouteElement>
          <ProtectedRouteElement authNeed={false} path="/register">
            <Register />
          </ProtectedRouteElement>
          <ProtectedRouteElement authNeed={false} path="/forgot-password">
            <ForgotPassword />
          </ProtectedRouteElement>
          <ProtectedRouteElement authNeed={false} path="/reset-password">
            <ResetPassword />
          </ProtectedRouteElement>
          <ProtectedRouteElement authNeed={true} path="/profile" exact>
            <Profile>
              <ProfileForm></ProfileForm>
            </Profile>
          </ProtectedRouteElement>
          <ProtectedRouteElement authNeed={true} path="/profile/orders" exact>
            <Profile>
              <OrderHistory />
            </Profile>
          </ProtectedRouteElement>
          {modalState && ( //Если true отобрази модальное окно
            <>
              <Route path="/ingredients/:id">
                <DndProvider backend={HTML5Backend}>
                  <BurgerIngridients />
                  <BurgerConstructor />
                </DndProvider>
                <Modal onModalClose={handlerModalClose}>
                  <IngridientDetails />
                </Modal>
              </Route>
              <ProtectedRouteElement authNeed={true} path="/profile/orders/:id" exact>
                <Profile>
                  <Modal onModalClose={handlerModalClose}>
                    <Order />
                  </Modal>
                </Profile>
              </ProtectedRouteElement>
              <Route path="/feed/:id" exact>
                <Feed />
                <Modal onModalClose={handlerModalClose}>
                  <Order />
                </Modal>
              </Route>
            </>
          )}
          {!modalState && (
            <>
              <Route path="/ingredients/:id">
                <IngridientPage />
              </Route>
              <Route path="/profile/orders/:id" exact>
                <Order />
              </Route>
              <Route path="/feed/:id" exact>
                <Order />
              </Route>
            </>
          )}
        </Switch>
      </main>
    </>
  );
}

export default App;
