import { TIngredientsItems } from "../services/types/data";

export const uuidv4 = (): string => {
  //@ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      // eslint-disable-next-line
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
  );
  return matches ? decodeURIComponent(matches[1]) : '';
}

export function deleteCookie() {
  document.cookie = `refreshToken=; path=/; max-age=1200`;
  document.cookie = `accessToken=; path=/; max-age=1200`;
}

export function getAccessToken() {}

export const splitChunks = (array: { number: number; name: string; status: string; ingredients: []; createdAt: string; _id: string; }[], chunkSize: number, maxChunks: number) => {
  let result = [];
  for (let i = 0; i < maxChunks * chunkSize; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
};

export interface GenericObject {
  [key: string]: any,
}

export const fillDetailedInformationOrder = (ingredients: GenericObject  , descriptionIngr:  TIngredientsItems[]) => {
  // ingredients - массив с id заказов
  // descriptionIngr - дефолтный список ингридиентов с описанием
  console.log(descriptionIngr)

  

  if (!Array.isArray(ingredients)) return { ingredients: {}, price: 0 };

  return ingredients.reduce(
    // ingr - id заказа
    // acc - объект заказа c price - number и ingredients: {643d69a5c3f7b9001cfa093d: {count: 1 image: "https://code.s3.yandex.net/react/code/bun-01.png" name: "Флюоресцентная булка R2-D3" price : 98 type: "bun"}},  5242ff2442:{...}

    (acc, ingr) => {
      const detIngr = descriptionIngr.find((descIngr: {_id: string}) => descIngr._id === ingr);
      if (detIngr) {
        if (acc.ingredients[ingr]) {
          return {
            ingredients: {
              ...acc.ingredients,
              [ingr]: {
                ...acc.ingredients[ingr],
                count: acc.ingredients[ingr].count + 1,
              },
            },
            price: acc.price + detIngr.price,
          };
        } else {
          return {
            ingredients: {
              ...acc.ingredients,
              [ingr]: {
                image: detIngr.image,
                price: detIngr.price,
                type: detIngr.type,
                name: detIngr.name,
                count: 1,
              },
            },
            price: acc.price + detIngr.price,
          };
        }
      } else {
        return acc;
      }
    },
    { ingredients: {}, price: 0 }
  );
};
