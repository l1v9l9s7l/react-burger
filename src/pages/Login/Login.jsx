import styles from "./Login.module.css";
import {
  Button,
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { setUser } from "../../services/actions/userAction";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authorization } from "../../utils/api";
import { useLocation, Redirect } from "react-router-dom";
import { logUser } from "../../services/actions/userAction";

export function Login() {
  const location = useLocation();
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

  const signIn = (event) => {
    event.preventDefault();
    dispatch(logUser(loginInputState, passwordInputState));
  };

  return (
    <form onSubmit={signIn}>
      <div className={styles.content}>
        <h2 className={styles.title}>Вход</h2>
        <EmailInput
          value={loginInputState}
          onChange={loginChangeHandler}
          placeholder="E-mail"
        ></EmailInput>
        <div className="pt-6"></div>
        <PasswordInput value={passwordInputState} onChange={passwordChangeHandler}></PasswordInput>
        <div className={`pt-6 pb-20 ${styles.enterButton}`}>
          <Button htmlType="submit" size="large">
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
    </form>
  );
}
