import styles from "./ResetPassword.module.css";
import { useEffect, useRef, useState } from "react";
import { resetPasswordPost } from "../../utils/api";
import {
  Button,
  PasswordInput,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useLocation, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export function ResetPassword() {
  const location = useLocation();
  const [passwordInputState, setPasswordInputState] = useState("");
  const [codeInputState, setCodeInputState] = useState("");
  const resetPassRequest = useSelector((state) => state.page.sendPasswordResetRequest);

  function handleChangePassword(event) {
    setPasswordInputState(event.target.value);
  }

  function handleChangeCode(event) {
    setCodeInputState(event.target.value);
  }

  const sendPassword = () => {
    resetPasswordPost(passwordInputState, codeInputState).then((res) => {
      console.log(res);
    });
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

  if (!resetPassRequest) {
    return <Redirect to={location?.state?.from || "/forgot-password"} />;
  }

  return (
    <>
      <div className={styles.content}>
        <h2 className={styles.title}>Восстановление пароля</h2>
        <PasswordInput
          onChange={handleChangePassword}
          placeholder="Введите новый пароль"
        ></PasswordInput>
        <div className="pt-6"></div>
        <Input onChange={handleChangeCode} placeholder="Введите код из письма"></Input>
        <div className={`pt-6 pb-20 ${styles.enterButton}`}>
          <Button onClick={sendPassword} size="large">
            Сохранить
          </Button>
        </div>
        <p className={`${styles.loginText}`}>
          Вспомнили пароль?
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </>
  );
}
