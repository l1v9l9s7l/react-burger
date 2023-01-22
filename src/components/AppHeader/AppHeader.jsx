import styles from "./AppHeader.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  BurgerIcon,
  CloseIcon,
  CheckMarkIcon,
  CurrencyIcon,
  DragIcon,
  EditIcon,
  HideIcon,
  InfoIcon,
  ListIcon,
  LockIcon,
  LogoutIcon,
  ProfileIcon,
  ShowIcon,
  DeleteIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MenuIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function AppHeader() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  function getCookie() {
    const matches = document.cookie.match(
      new RegExp("(?:^|; )" + "user".replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
    );
    console.log(matches ? decodeURIComponent(matches[1]) : undefined);
  }

  useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);

  function watchCookie() {
    console.log(document.cookie);
  }

  const curUser = getCookie("user");

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.navigation}>
          <a className={styles.headerConstructor}>
            <div className="pl-5"></div>
            <BurgerIcon />
            <p className="pl-2 pr-5">Конструктор</p>
          </a>
          <a className={`${styles.headerOrderList} pl-2`}>
            <div className={`${styles.navigationIcon} pl-5`}>
              <ListIcon type="secondary" />
            </div>
            <p className="text_color_inactive pl-2 pr-5">Лента заказов</p>
          </a>
        </div>
        <Link to="/" className={styles.logo}>
          <Logo />
        </Link>
        <button onClick={watchCookie}></button>
        <button onClick={getCookie}></button>
        {curUser && (
          <Link className={styles.profile} to="/profile">
            <ProfileIcon type="secondary" />
            <p className={`${styles.profileText} ${styles.text_color_inactive}`}>Личный кабинет</p>
          </Link>
        )}
        {!curUser && (
          <Link className={styles.profile} to="/login">
            <ProfileIcon type="secondary" />
            <p className={`${styles.profileText} ${styles.text_color_inactive}`}>Личный кабинет</p>
          </Link>
        )}
      </div>
    </header>
  );
}
