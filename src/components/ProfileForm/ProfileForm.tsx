import styles from "./ProfileForm.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateUserData } from "../../utils/api";
import { updateAccessToken } from "../../utils/api";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { uploadUserData } from "../../utils/api";
import { uploadUser } from "../../services/actions/userAction";

export function ProfileForm() {
  let history = useHistory();
  const userStoreData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const cookieAccessToken = document.cookie.match(
    new RegExp(
      "(?:^|; )" + "accessToken".replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  const cookieAccessTokenDecode = cookieAccessToken
    ? decodeURIComponent(cookieAccessToken[1])
    : '';

  const cookieRefreshToken = document.cookie.match(
    new RegExp(
      "(?:^|; )" + "refreshToken".replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  const cookieRefreshTokenDecode = cookieRefreshToken
    ? decodeURIComponent(cookieRefreshToken[1])
    : '';

  const [dataName, setDataName] = useState(userStoreData.name);
  const [dataLogin, setDataLogin] = useState(userStoreData.email);
  const [dataPassword, setDataPassword] = useState("");
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    setDataName(userStoreData.name);
    setDataLogin(userStoreData.email);
  }, [userStoreData]);

  // TODO
  useEffect(() => {
    if (isAuthenticated) {
      uploadUserData(cookieAccessTokenDecode)
        .then((res) => {
          dispatch(uploadUser(res));
        })
        .catch(() => {
          updateAccessToken(cookieRefreshTokenDecode)
            .then((res) => {
              uploadUserData(res.accessToken).then((res) => {
                dispatch(uploadUser(res));
              });
            })
            .catch(() => {
              history.push({
                pathname: "/login",
              });
            });
        });
    }
  }, []);

  const saveData = (event: {preventDefault: Function}) => {
    event.preventDefault();
    updateUserData(dataName, dataLogin, dataPassword, cookieAccessTokenDecode).then((res) => {
      console.log(res);
    });
  };

  function changeDataName(event: {target: {value: string}}) {
    setDataName(event.target.value);
  }

  function changeDataLogin(event: {target: {value: string}}) {
    setDataLogin(event.target.value);
  }

  function changeDataPassword(event: {target: {value: string}}) {
    setDataPassword(event.target.value);
  }

  return (
    <form onSubmit={saveData}>
      <div className={styles.content}>
        <Input
          onChange={changeDataName}
          icon="EditIcon"
          value={dataName}
          placeholder="Имя"
          extraClass="mb-6"
        ></Input>
        <Input
          onChange={changeDataLogin}
          icon="EditIcon"
          value={dataLogin}
          placeholder="Логин"
          extraClass="mb-6"
        ></Input>
        <Input
          onChange={changeDataPassword}
          value={dataPassword}
          type="password"
          icon="EditIcon"
          placeholder="Пароль"
          extraClass="mb-6"
        ></Input>
        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton}>Отмена</button>
          <Button htmlType="submit">Сохранить</Button>
        </div>
      </div>
    </form>
  );
}
