import styles from "./ForgotPassword.module.css";
import { useEffect, useRef, useState } from "react";
import { forgotPasswordPost } from "../../utils/api";
import {
  Button,
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPassRequest } from "../../services/actions/pageAction";
import { resetPassword } from "../../services/actions/userAction";

export function ForgotPassword() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [inputState, setInputState] = useState("");
  let history = useHistory();

  function handleChange(event) {
    setInputState(event.target.value);
  }

  const sendEmail = (event) => {
    event.preventDefault();
    if (inputState) {
      if (inputState.length > 3) {
        dispatch(resetPassword(inputState, history));
      }
    } else if (inputState.length < 3) {
      alert("Введите корректный Email");
    }
  };

  const cookieRefreshToken = document.cookie.match(
    new RegExp(
      "(?:^|; )" + "refreshToken".replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  const cookieRefreshTokenDecode = cookieRefreshToken
    ? decodeURIComponent(cookieRefreshToken[1])
    : undefined;

  if (cookieRefreshTokenDecode) {
    return <Redirect to={location?.state?.from || "/"} />;
  }

  return (
    <form onSubmit={sendEmail}>
      <div className={styles.content}>
        <h2 className={styles.title}>Восстановление пароля</h2>
        <div>
          <EmailInput
            value={inputState}
            onChange={handleChange}
            placeholder="Укажите E-mail"
          ></EmailInput>
        </div>
        <div className={`pt-6 pb-20 ${styles.enterButton}`}>
          <Button htmlType="submit" size="large">
            Восстановить
          </Button>
        </div>
        <p className={`${styles.loginText}`}>
          Вспомнили пароль?
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </form>
  );
}
