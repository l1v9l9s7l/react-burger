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

export function ForgotPassword() {
  const [inputState, setInputState] = useState("");
  const [requestSuccess, setRequestSuccess] = useState(false);
  let history = useHistory();

  function handleChange(event) {
    setInputState(event.target.value);
  }

  const sendEmail = () => {
    forgotPasswordPost(inputState).then((res) => {
      console.log(res.success);
      if (res.success) {
        history.push({
          pathname: "/reset-password",
        });
      }
    });
  };

  return (
    <>
      <div className={styles.content}>
        <h2 className={styles.title}>Восстановление пароля</h2>
        <div>
          <EmailInput onChange={handleChange} placeholder="Укажите E-mail"></EmailInput>
        </div>
        <div className={`pt-6 pb-20 ${styles.enterButton}`}>
          <Button onClick={sendEmail} size="large">
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
    </>
  );
}
