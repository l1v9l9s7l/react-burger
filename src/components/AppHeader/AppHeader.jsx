import styles from "./AppHeader.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function AppHeader() {
  const dispatch = useDispatch();
  const cookieUser = document.cookie.match(
    new RegExp("(?:^|; )" + "user".replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
  );
  const cookieUserDecode = cookieUser ? decodeURIComponent(cookieUser[1]) : undefined;

  function setCurrentPage() {
    dispatch({ type: "SET_CURRENT_PAGE", payload: "/profile" });
  }

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
        {cookieUserDecode && (
          <Link className={styles.profile} to="/profile">
            <ProfileIcon type="secondary" />
            <p className={`${styles.profileText} ${styles.text_color_inactive}`}>Личный кабинет</p>
          </Link>
        )}
        {!cookieUserDecode && (
          <Link onClick={setCurrentPage} className={styles.profile} to="/login">
            <ProfileIcon type="secondary" />
            <p className={`${styles.profileText} ${styles.text_color_inactive}`}>Личный кабинет</p>
          </Link>
        )}
      </div>
    </header>
  );
}
