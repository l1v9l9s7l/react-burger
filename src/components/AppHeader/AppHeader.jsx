import styles from "./AppHeader.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AppHeader() {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentPath = history.location.pathname;
  const [menuConstructorActive, setMenuConstructorActive] = useState(false);
  const [menuAccountActive, setMenuAccountActive] = useState(false);
  const cookieUser = document.cookie.match(
    new RegExp("(?:^|; )" + "user".replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
  );
  const cookieUserDecode = cookieUser ? decodeURIComponent(cookieUser[1]) : undefined;

  function setCurrentPage() {
    dispatch({ type: "SET_CURRENT_PAGE", payload: "/profile" });
  }

  function watchCookie() {
    console.log(document.cookie);
  }

  useEffect(() => {
    if (currentPath == "/profile") {
      setAccountActive();
    }
  }, []);

  useEffect(() => {
    if (currentPath == "/") {
      setConstructorActive();
    }
  }, []);

  function setConstructorActive() {
    console.log("com1");
    setMenuConstructorActive(true);
    setMenuAccountActive(false);
  }

  function setAccountActive() {
    console.log("com2");
    setMenuAccountActive(true);
    setMenuConstructorActive(false);
  }

  console.log(menuAccountActive);

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.navigation}>
          <Link onClick={setConstructorActive} className={styles.headerConstructor} to="/">
            <div className="pl-5"></div>
            <BurgerIcon type={menuConstructorActive ? "primary" : "secondary"} />
            <p
              className={
                menuConstructorActive
                  ? `${styles.profileText} ${styles.text_color_active}`
                  : `${styles.profileText} ${styles.text_color_inactive}`
              }
            >
              Конструктор
            </p>
          </Link>
          <a className={`${styles.headerOrderList} pl-2`}>
            <div className={`${styles.navigationIcon} pl-5`}>
              <ListIcon type="secondary" />
            </div>
            <p className="text_color_inactive pl-2 pr-5">Лента заказов</p>
          </a>
        </div>
        <Link onClick={setConstructorActive} to="/" className={styles.logo}>
          <Logo />
        </Link>
        <button onClick={watchCookie}>
          <p>Cookie</p>
        </button>
        <Link
          onClick={setAccountActive}
          className={styles.profile}
          to={cookieUserDecode ? "/profile" : "/login"}
        >
          <ProfileIcon type={menuAccountActive ? "primary" : "secondary"} />
          <p
            className={`${styles.profileText} ${
              menuAccountActive ? styles.text_color_active : styles.text_color_inactive
            }`}
          >
            Личный кабинет
          </p>
        </Link>
      </div>
    </header>
  );
}
