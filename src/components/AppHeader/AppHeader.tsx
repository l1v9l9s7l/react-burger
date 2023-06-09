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
import { UPLOAD_USER } from "../../services/actions/userAction";
import { uploadUserData } from "../../utils/api";
import { getCookie } from "../../utils/utils";
import { useDispatch, useSelector } from "../../hooks/hooks";

export default function AppHeader() {
  const dispatch = useDispatch();
  const accessToken = getCookie("accessToken");
  const history = useHistory();
  const currentPath = history.location.pathname;
  const [menuConstructorActive, setMenuConstructorActive] = useState(false);
  const [menuAccountActive, setMenuAccountActive] = useState(false);
  const [menuOrderListActive, setMenuOrderListActive] = useState(false);
  const authChecked = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (accessToken) {
      if (accessToken.length > 5) {
        uploadUserData(accessToken).then((res) => {
          dispatch({ type: UPLOAD_USER, payload: res });
        });
      }
    }
  }, []);

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
    setMenuOrderListActive(false);
  }

  function setAccountActive() {
    setMenuAccountActive(true);
    setMenuConstructorActive(false);
    setMenuOrderListActive(false);
  }

  function setOrderListActive() {
    setMenuOrderListActive(true);
    setMenuAccountActive(false);
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
          <Link
            onClick={setOrderListActive}
            to="/feed"
            className={`${styles.headerOrderList} pl-2`}
          >
            <div className={`${styles.navigationIcon} pl-5`}>
              <ListIcon type={menuOrderListActive ? "primary" : "secondary"} />
            </div>
            <p
              className={`${styles.profileText} ${
                menuOrderListActive ? styles.text_color_active : styles.text_color_inactive
              }`}
            >
              Лента заказов
            </p>
          </Link>
        </div>
        <Link onClick={setConstructorActive} to="/" className={styles.logo}>
          <Logo />
        </Link>
        <Link
          onClick={setAccountActive}
          className={styles.profile}
          to={authChecked ? "/profile" : "/login"}
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
