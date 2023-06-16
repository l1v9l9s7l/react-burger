import styles from "./Register.module.css";
import {
  Button,
  PasswordInput,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { sendRegistrationForm } from "../../utils/api";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { getCookie } from "../../utils/utils";
import { useLocation, Redirect } from "react-router-dom";

export function Register() {
  const [nameInputState, setNameInputState] = useState("");
  const [passwordInputState, setPasswordInputState] = useState("");
  const [emailInputState, setEmailInputState] = useState("");
  const [user, setUser] = useState({});
  const [requestSuccess, setRequestSuccess] = useState(false);
  let history = useHistory();
  const location = useLocation<{from: string}>();

  function handleChangeName(event: {target: {value: string}}) {
    setNameInputState(event.target.value);
  }

  function handleChangePassword(event: {target: {value: string}}) {
    setPasswordInputState(event.target.value);
  }

  function handleChangeEmail(event: {target: {value: string}}) {
    setEmailInputState(event.target.value);
  }

  const sendForm = (event: {preventDefault: Function}) => {
    event.preventDefault();
    sendRegistrationForm(emailInputState, passwordInputState, nameInputState).then((res) => {
      setUser(res);
      setRequestSuccess(res);
      document.cookie = `refreshToken=${res.refreshToken} ; path=/; max-age=12`;
      document.cookie = `accessToken=${res.accessToken} ; path=/; max-age=12`;
    });
  };

  useEffect(() => {
    //Переадресация на главную страницу после регистрации
    const curUser = getCookie("user");
    if (curUser) {
      if (curUser.length > 0) {
        history.push({
          pathname: "/",
        });
      }
    }
  }, [requestSuccess]);

  const refreshToken = getCookie("refreshToken");

  if (refreshToken) {
    return <Redirect to={location?.state?.from || "/"} />;
  }

  return (
    <form onSubmit={sendForm}>
      <div className={styles.content}>
        <h2 className={styles.title}>Регистрация</h2>
        <Input onChange={handleChangeName} placeholder="Имя"></Input>
        <div className="pt-6"></div>
        <EmailInput onChange={handleChangeEmail} placeholder="E-mail"></EmailInput>
        <div className="pt-6"></div>
        <PasswordInput onChange={handleChangePassword}></PasswordInput>
        <div className={`pt-6 pb-20 ${styles.enterButton}`}>
          <Button htmlType="submit" size="large">
            Зарегистрироваться
          </Button>
        </div>
        <p className={styles.loginText}>
          Уже зарегистрированы?
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </form>
  );
}
