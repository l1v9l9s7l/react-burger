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
import { useSelector } from "../../hooks/hooks";
import { getCookie } from "../../utils/utils";

export function ResetPassword() {
  const location = useLocation<any>();
  const [passwordInputState, setPasswordInputState] = useState("");
  const [codeInputState, setCodeInputState] = useState("");
  const resetPassRequest = useSelector((state) => state.page.sendPasswordResetRequest);

  function handleChangePassword(event: any) {
    setPasswordInputState(event.target.value);
  }

  function handleChangeCode(event: any) {
    setCodeInputState(event.target.value);
  }

  const sendPassword = (event: any) => {
    event.preventDefault();
    resetPasswordPost(passwordInputState, codeInputState).then((res) => {
      console.log(res);
    });
  };

  const refreshToken = getCookie("refreshToken");

  if (refreshToken) {
    return <Redirect to={location?.state?.from || "/"} />;
  }

  if (!resetPassRequest) {
    return <Redirect to={location?.state?.from || "/forgot-password"} />;
  }

  return (
    <form onSubmit={sendPassword}>
      <div className={styles.content}>
        <h2 className={styles.title}>Восстановление пароля</h2>
        <PasswordInput
          value={passwordInputState}
          onChange={handleChangePassword}
          placeholder="Введите новый пароль"
        ></PasswordInput>
        <div className="pt-6"></div>
        <Input
          value={codeInputState}
          onChange={handleChangeCode}
          placeholder="Введите код из письма"
        ></Input>
        <div className={`pt-6 pb-20 ${styles.enterButton}`}>
          <Button htmlType="submit" size="large">
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
    </form>
  );
}
