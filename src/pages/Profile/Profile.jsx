import styles from "./Profile.module.css";
import {
  Button,
  PasswordInput,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCookie } from "../../utils/utils";
import { useSelector } from "react-redux";
import { setUser } from "../../services/actions/userAction";
import { useDispatch } from "react-redux";

export function Profile() {
  // const { form, setForm } = { name: "", email: "", password: "", isChanged: false };
  let user = useSelector((state) => state.user);
  const [buttonActive, setButtonActive] = useState(false);

  const dispatch = useDispatch();

  let history = useHistory();
  function logOut() {
    document.cookie = `login=; path=/; max-age=1200`;
    document.cookie = `user=; path=/; max-age=1200`;
    document.cookie = `refreshToken= ; path=/; max-age=1200`;
    document.cookie = `accessToken= ; path=/; max-age=1200`;
    history.push({
      pathname: "/",
    });
  }

  console.log(history.location.pathname);

  function activateButton() {
    const profileButton = document.getElementById("buttonOne");
    profileButton.classList.add("navigationButton_active");
  }

  useEffect(() => {
    //Переадресация на главную страницу в случае отстутствия данных о пользователе
    const curUser = getCookie("user");
    console.log(curUser);
    if (curUser == undefined) {
      console.log(1488);
      history.push({
        pathname: "/",
      });
    }
  }, []);

  const cookieUser = document.cookie.match(
    new RegExp("(?:^|; )" + "user".replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
  );
  const cookieUserDecode = cookieUser ? decodeURIComponent(cookieUser[1]) : undefined;

  const cookieLogin = document.cookie.match(
    new RegExp("(?:^|; )" + "login".replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
  );
  const cookieLoginDecode = cookieLogin ? decodeURIComponent(cookieLogin[1]) : undefined;

  if (cookieUserDecode.length == 0) {
    history.push({
      pathname: "/",
    });
  }

  return (
    <>
      <div className={styles.commonContainer}>
        <div className={styles.navigation}>
          <button
            onClick={activateButton}
            id="buttonOne"
            className={buttonActive ? styles.navigationButton : styles.navigationButton_active}
          >
            Профиль
          </button>
          <button className={styles.navigationButton}>История заказов</button>
          <button onClick={logOut} className={styles.navigationButton}>
            Выход
          </button>
        </div>
        <div className={styles.content}>
          <Input icon="EditIcon" defaultValue={cookieUserDecode} placeholder="Имя"></Input>
          <div className="pt-6"></div>
          <Input icon="EditIcon" defaultValue={cookieLoginDecode} placeholder="Логин"></Input>
          <div className="pt-6"></div>
          <Input type="password" icon="EditIcon" placeholder="Пароль"></Input>
        </div>
      </div>
    </>
  );
}
