import styles from "./Register.module.css";
import {
  Button,
  PasswordInput,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export function Register() {
  return (
    <>
      <div className={styles.content}>
        <h2 className={styles.title}>Регистрация</h2>
        <Input placeholder="Имя"></Input>
        <div className="pt-6"></div>
        <EmailInput placeholder="E-mail"></EmailInput>
        <div className="pt-6"></div>
        <PasswordInput></PasswordInput>
        <div className={`pt-6 pb-20 ${styles.enterButton}`}>
          <Button size="large">Зарегистрироваться</Button>
        </div>
        <p className={styles.loginText}>
          Уже зарегистрированы?
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </>
  );
}
