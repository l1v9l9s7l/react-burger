import styles from "./ProfileForm.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateUserData } from "../../utils/api";
import { updateAccessToken } from "../../utils/api";
import { useSelector } from "react-redux";
import { uploadUserData } from "../../utils/api";
import { useDispatch } from "react-redux";
import { uploadUser } from "../../services/actions/userAction";

export function ProfileForm() {
  let history = useHistory();
  const userStoreData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const cookieUser = document.cookie.match(
    new RegExp("(?:^|; )" + "user".replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
  );
  const cookieUserDecode = cookieUser ? decodeURIComponent(cookieUser[1]) : undefined;

  const cookieLogin = document.cookie.match(
    new RegExp("(?:^|; )" + "login".replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
  );
  const cookieLoginDecode = cookieLogin ? decodeURIComponent(cookieLogin[1]) : undefined;

  const cookieAccessToken = document.cookie.match(
    new RegExp(
      "(?:^|; )" + "accessToken".replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  const cookieAccessTokenDecode = cookieAccessToken
    ? decodeURIComponent(cookieAccessToken[1])
    : undefined;

  const cookieRefreshToken = document.cookie.match(
    new RegExp(
      "(?:^|; )" + "refreshToken".replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  const cookieRefreshTokenDecode = cookieRefreshToken
    ? decodeURIComponent(cookieRefreshToken[1])
    : undefined;

  //Переадресация на главную страницу в случае отстутствия данных о пользователе
  // if (!cookieUserDecode) {
  //   history.push({
  //     pathname: "/login",
  //   });
  // }

  // console.log(cookieUserDecode);

  const [dataName, setDataName] = useState(cookieUserDecode);
  const [dataLogin, setDataLogin] = useState(cookieLoginDecode);
  const [dataPassword, setDataPassword] = useState("");

  const userDataStore = useSelector((state) => state.user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      uploadUserData(cookieAccessTokenDecode)
        .then((res) => {
          dispatch(uploadUser(res));
        })
        .catch(() => {
          console.log("Not Valid Token");
          console.log(cookieRefreshTokenDecode);
          updateAccessToken(cookieRefreshTokenDecode)
            .then((res) => {
              console.log(res);
              uploadUserData(res.accessToken).then((res) => {
                dispatch(uploadUser(res));
                console.log(res);
              });
            })
            .catch(() => {
              history.push({
                pathname: "/login",
              });
            });
        });
      // console.log(cookieAccessTokenDecode);
    }
  }, []);

  // TODO
  function saveData() {
    updateUserData(dataName, dataLogin, dataPassword, cookieAccessTokenDecode).then((res) => {
      console.log(res);
      // document.cookie = `user=${res.user.name}; path=/; max-age=1200`;
      // document.cookie = `login=${res.user.email}; path=/; max-age=1200`;
    });
  }

  function changeDataName(event) {
    setDataName(event.target.value);
  }

  function changeDataLogin(event) {
    setDataLogin(event.target.value);
  }

  function changeDataPassword(event) {
    setDataPassword(event.target.value);
  }

  return (
    <>
      <div className={styles.content}>
        <Input
          onChange={changeDataName}
          icon="EditIcon"
          value={userStoreData.name}
          placeholder="Имя"
          extraClass="mb-6"
        ></Input>
        <Input
          onChange={changeDataLogin}
          icon="EditIcon"
          value={userStoreData.email}
          placeholder="Логин"
          extraClass="mb-6"
        ></Input>
        <Input
          onChange={changeDataPassword}
          value={""}
          type="password"
          icon="EditIcon"
          placeholder="Пароль"
          extraClass="mb-6"
        ></Input>
        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton}>Отмена</button>
          <Button onClick={saveData}>Сохранить</Button>
        </div>
      </div>
    </>
  );
}
