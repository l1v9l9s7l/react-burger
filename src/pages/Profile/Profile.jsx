import styles from "./Profile.module.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { deleteCookie } from "../../utils/utils";
import { logOutOnServer } from "../../utils/api";

export function Profile(props) {
  const [menuProfile, setMenuProfile] = useState(false);
  const [menuOrder, setMenuOrder] = useState(false);

  const cookieRefreshToken = document.cookie.match(
    new RegExp(
      "(?:^|; )" + "refreshToken".replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  const cookieRefreshTokenDecode = cookieRefreshToken
    ? decodeURIComponent(cookieRefreshToken[1])
    : undefined;

  let history = useHistory();
  function logOut() {
    deleteCookie();
    history.push({
      pathname: "/",
    });
    logOutOnServer(cookieRefreshTokenDecode).then((res) => {
      console.log(res);
    });
  }

  function profileButton() {
    const profileButton = document.getElementById("buttonOne");
    profileButton.classList.add("navigationButton_active");
    setMenuProfile(true);
    setMenuOrder(false);
  }

  function orderButton() {
    setMenuProfile(false);
    setMenuOrder(true);
  }

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
