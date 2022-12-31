import styles from "./Login.module.css";
// import { Input } from "../../components/Input/Input";
import {
  Button,
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export function Login() {
  return (
    <>
      <div className={styles.content}>
        <h2 className={styles.title}>Вход</h2>
        <EmailInput placeholder="E-mail"></EmailInput>
        <div className="pt-6"></div>
        <PasswordInput></PasswordInput>
        <div className={`pt-6 pb-20 ${styles.enterButton}`}>
          <Button size="large">Войти</Button>
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
