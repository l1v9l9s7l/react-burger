import styles from "./Login.module.css";
// import { Input } from "../../components/Input/Input";
import {
  Button,
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setUser, setUserAuth } from "../../services/actions/userAction";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { authorization } from "../../utils/api";
import { getCookie } from "../../utils/utils";

export function Login() {
  const [loginInputState, setLoginInputState] = useState("");
  const [passwordInputState, setPasswordInputState] = useState("");
  let user = useSelector((state) => state.user);
  let history = useHistory();
  const dispatch = useDispatch();
  const pageState = useSelector((state) => state.page);

  function loginChangeHandler(event) {
    setLoginInputState(event.target.value);
  }

  function passwordChangeHandler(event) {
    setPasswordInputState(event.target.value);
  }

  const logUser = () => {
    authorization(loginInputState, passwordInputState).then((res) => {
      document.cookie = `refreshToken=${res.refreshToken} ; path=/; max-age=1200`;
      document.cookie = `accessToken=${res.accessToken} ; path=/; max-age=1200`;
      if (res.success) {
        dispatch(setUser({ email: res.user.email, name: res.user.name, isAuthenticated: true }));
        if (pageState.currentPage == "/") {
          history.push({
            pathname: "/",
          });
        } else {
          history.push({
            pathname: "/profile",
          });
        }
      }
    });
  };

  return (
    <>
      <div className={styles.content}>
        <h2 className={styles.title}>Вход</h2>
        <EmailInput onChange={loginChangeHandler} placeholder="E-mail"></EmailInput>
        <div className="pt-6"></div>
        <PasswordInput onChange={passwordChangeHandler}></PasswordInput>
        <div className={`pt-6 pb-20 ${styles.enterButton}`}>
          <Button size="large" onClick={logUser}>
            Войти
          </Button>
        </div>
        <p className={styles.loginText}>
          Вы - новый пользователь?
          <Link to="/register" className={styles.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className={styles.loginText}>
          Забыли пароль?
          <Link to="/forgot-password" className={styles.link}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </>
  );
}