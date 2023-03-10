import styles from "./AppHeader.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function AppHeader() {
  const history = useHistory();
  const currentPath = history.location.pathname;
  const [menuConstructorActive, setMenuConstructorActive] = useState(false);
  const [menuAccountActive, setMenuAccountActive] = useState(false);
  const cookieRefreshToken = document.cookie.match(
    new RegExp(
      "(?:^|; )" + "refreshToken".replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  const cookieRefreshTokenDecode = cookieRefreshToken
    ? decodeURIComponent(cookieRefreshToken[1])
    : undefined;

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
    setMenuConstructorActive(true);
    setMenuAccountActive(false);
  }

  function setAccountActive() {
    setMenuAccountActive(true);
    setMenuConstructorActive(false);
  }

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
        <Link
          onClick={setAccountActive}
          className={styles.profile}
          to={cookieRefreshTokenDecode ? "/profile" : "/login"}
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
