const config = {
  baseURL: 'https://norma.nomoreparties.space/api/ingredients ',
  headers: {
    authorization: '54da0c89-ce48-4884-99bf-abf92ea9ad7d',
    'Content-Type': 'application/json'
  }
}

const checkRes = (res) => {
  if (res.ok) {
    return res.json();

  };

  return Promise.reject(`Ошибка: ${res.status}`);
};

const fetchIngredients = () => {
  return fetch(`${config.baseURL}`)
    .then(checkRes)
};

export {
  fetchIngredients
};