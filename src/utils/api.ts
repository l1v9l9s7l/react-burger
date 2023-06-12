import { getCookie } from "./utils";

const config = {
  baseURL: "https://norma.nomoreparties.space/api/",
  headers: {
    "Content-Type": "application/json",
  },
};

const checkRes = (res: any) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
};

const fetchIngredients = () => {
  return fetch(`${config.baseURL}ingredients`).then(checkRes);
};

const postOrder = (ingredientsId: any) => {
  return fetch(`${config.baseURL}orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: getCookie("accessToken"),
    },
    body: JSON.stringify({
      ingredients: ingredientsId,
    }),
  }).then(checkRes);
};

const forgotPasswordPost = (email: any) => {
  return fetch(`${config.baseURL}password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: getCookie("token"),
    },
    body: JSON.stringify({
      email: email,
    }),
  }).then(checkRes);
};

const resetPasswordPost = (password: any, token: any) => {
  return fetch(`${config.baseURL}password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      token: token,
    }),
  }).then(checkRes);
};

const sendRegistrationForm = (email: any, password: any, name: any) => {
  return fetch(`${config.baseURL}auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  }).then(checkRes);
};

const authorization = (email: any, password: any) => {
  return fetch(`${config.baseURL}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then(checkRes);
};

const updateUserData = (name: any, email: any, password: any, token: any) => {
  return fetch(`${config.baseURL}auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  }).then(checkRes);
};

const uploadUserData = (accessToken: any) => {
  return fetch(`${config.baseURL}auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: accessToken,
    },
  }).then(checkRes);
};

const updateAccessToken = (refreshToken: any) => {
  return fetch(`${config.baseURL}auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then(checkRes);
};

const logOutOnServer = (refreshToken: any) => {
  return fetch(`${config.baseURL}auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then(checkRes);
};

export {
  fetchIngredients,
  postOrder,
  forgotPasswordPost,
  resetPasswordPost,
  sendRegistrationForm,
  authorization,
  updateUserData,
  uploadUserData,
  updateAccessToken,
  logOutOnServer,
};
