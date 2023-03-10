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
import { useDispatch, useSelector } from "react-redux";
import { setUserAuth } from "../../services/actions/userAction";
import { getCookie } from "../../utils/utils";

export function Register() {
  const [nameInputState, setNameInputState] = useState("");
  const [passwordInputState, setPasswordInputState] = useState("");
  const [emailInputState, setEmailInputState] = useState("");
  const [user, setUser] = useState({});
  const [requestSuccess, setRequestSuccess] = useState(false);
  let history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.user.isAuthenticated);

  function handleChangeName(event) {
    setNameInputState(event.target.value);
  }

  function handleChangePassword(event) {
    setPasswordInputState(event.target.value);
  }

  function handleChangeEmail(event) {
    setEmailInputState(event.target.value);
  }

  const sendForm = () => {
    sendRegistrationForm(emailInputState, passwordInputState, nameInputState).then((res) => {
      setUser(res);
      setRequestSuccess(res);
      console.log(res);
      document.cookie = `user=${nameInputState}; path=/; max-age=1200`;
      document.cookie = `login=${res.user.email}; path=/; max-age=1200`;
      document.cookie = `refreshToken=${res.refreshToken} ; path=/; max-age=1200`;
      document.cookie = `accessToken=${res.accessToken} ; path=/; max-age=1200`;
    });
    console.log(user);
  };

  useEffect(() => {
    console.log(auth);
  }, [auth]);

  useEffect(() => {
    //Переадресация на главную страницу после регистрации
    const curUser = getCookie("user");
    if (curUser) {
      if (curUser.length > 0) {
        // dispatch(setUserAuth(true));
        history.push({
          pathname: "/",
        });
      }
    }
  }, [requestSuccess]);

  return (
    <>
      <div className={styles.content}>
        <h2 className={styles.title}>Регистрация</h2>
        <Input onChange={handleChangeName} placeholder="Имя"></Input>
        <div className="pt-6"></div>
        <EmailInput onChange={handleChangeEmail} placeholder="E-mail"></EmailInput>
        <div className="pt-6"></div>
        <PasswordInput onChange={handleChangePassword}></PasswordInput>
        <div className={`pt-6 pb-20 ${styles.enterButton}`}>
          <Button onClick={sendForm} size="large">
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
    </>
  );
}