const config = {
  baseURL: "https://norma.nomoreparties.space/api/",
  headers: {
    "Content-Type": "application/json",
  },
};

const checkRes = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
};

const fetchIngredients = () => {
  return fetch(`${config.baseURL}ingredients`).then(checkRes);
};

const postOrder = (ingredientsId) => {
  return fetch(`${config.baseURL}orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ingredientsId,
    }),
  }).then(checkRes);
};

const forgotPasswordPost = (email) => {
  return fetch(`${config.baseURL}password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  }).then(checkRes);
};

const resetPasswordPost = (password, token) => {
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

const sendRegistrationForm = (email, password, name) => {
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

const authorization = (email, password) => {
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

const updateUserData = (name, email, password, token) => {
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

export {
  fetchIngredients,
  postOrder,
  forgotPasswordPost,
  resetPasswordPost,
  sendRegistrationForm,
  authorization,
  updateUserData,
};
