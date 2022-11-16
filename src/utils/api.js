const config = {
  baseURL: 'https://norma.nomoreparties.space/api/ingredients ',
  headers: {
    authorization: '54da0c89-ce48-4884-99bf-abf92ea9ad7d',
    'Content-Type': 'application/json'
  }
}


const fetchIngredients = () => {
  return fetch(`https://norma.nomoreparties.space/api/ingredients`)
    .then((res) => {
      return res.json(); // возвращаем результат работы метода и идём в следующий then
    })
    .then((data) => {
      //console.log(data.data); // если мы попали в этот then, data — это объект
      return data
    })
};

const fetchOrderNumber = (baseUrl, ingredientsId) => {

  return fetch(`${baseUrl}/orders`, {
      method: "POST",
      headers: {
        authorization: '5743d2b2-8d60-4e50-9a9c-7a3ab60b2c12',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "ingredients": ingredientsId
      })
    })
    .then(checkRes);
}

const checkRes = (res) => {
  if (res.ok) {
    return res.json();

  };

  return Promise.reject(`Ошибка: ${res.status}`);
};

export {
  fetchIngredients,
  fetchOrderNumber
};