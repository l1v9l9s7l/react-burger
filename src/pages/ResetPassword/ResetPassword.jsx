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

export function ResetPassword() {
  const [passwordInputState, setPasswordInputState] = useState("");
  const [codeInputState, setCodeInputState] = useState("");

  function handleChangePassword(event) {
    setPasswordInputState(event.target.value);
    console.log();
  }

  function handleChangeCode(event) {
    setCodeInputState(event.target.value);
    console.log(codeInputState);
  }

  const sendPassword = () => {
    resetPasswordPost(passwordInputState, codeInputState).then((res) => {
      console.log(res);
    });
    console.log(codeInputState);
  };

  useEffect(() => {
    console.log(passwordInputState);
  }, [passwordInputState]);

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
