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
import { ProfileForm } from "../../components/ProfileForm/ProfileForm";
import { produceWithPatches } from "immer";

export function Profile(props) {
  // const { form, setForm } = { name: "", email: "", password: "", isChanged: false };
  let user = useSelector((state) => state.user);
  const [buttonActive, setButtonActive] = useState(false);
  const [menuProfile, setMenuProfile] = useState(false);
  const [menuOrder, setMenuOrder] = useState(false);

  useEffect(() => {
    setMenuProfile(true);
  }, []);

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

  function profileButton() {
    const profileButton = document.getElementById("buttonOne");
    profileButton.classList.add("navigationButton_active");
    console.log(menuProfile);
    setMenuProfile(true);
    setMenuOrder(false);
  }

  function orderButton() {
    setMenuProfile(false);
    setMenuOrder(true);
  }

  const location = history.location.pathname;

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

  // if (cookieUserDecode.length == undefined) {
  //   history.push({
  //     pathname: "/",
  //   });
  // }
  console.log(document.cookie);

  return (
    <>
      <div className={styles.commonContainer}>
        <div className={styles.navigation}>
          <Link to="/profile">
            {menuProfile ? (
              <button
                onClick={profileButton}
                id="buttonOne"
                className={styles.navigationButton_active}
              >
                Профиль
              </button>
            ) : (
              <button onClick={profileButton} id="buttonOne" className={styles.navigationButton}>
                Профиль
              </button>
            )}
          </Link>
          <Link to="/profile/orders">
            {menuOrder ? (
              <button onClick={orderButton} className={styles.navigationButton_active}>
                История заказов
              </button>
            ) : (
              <button onClick={orderButton} className={styles.navigationButton}>
                История заказов
              </button>
            )}
          </Link>
          <button onClick={logOut} className={styles.navigationButton}>
            Выход
          </button>
          {menuProfile ? (
            <p className={styles.navigationText}>
              В этом разделе вы можете изменить свои персональные данные
            </p>
          ) : (
            <p className={styles.navigationText}>
              В этом разделе вы можете просмотреть свою историю заказов
            </p>
          )}
        </div>
        {props.children}
      </div>
    </>
  );
}
