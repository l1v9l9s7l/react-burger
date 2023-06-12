export const uuidv4 = (): string => {
  //@ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      // eslint-disable-next-line
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

export function getCookie(name: any): any {
  const matches = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie() {
  // document.cookie = `login=; path=/; max-age=1200`;
  // document.cookie = `user=; path=/; max-age=1200`;
  document.cookie = `refreshToken=; path=/; max-age=1200`;
  document.cookie = `accessToken=; path=/; max-age=1200`;
}

export function getAccessToken() {}

export const splitChunks = (array: any, chunkSize: any, maxChunks: any) => {
  let result = [];
  for (let i = 0; i < maxChunks * chunkSize; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
};

export const fillDetailedInformationOrder = (ingredients: any, descriptionIngr: any) => {
  if (!Array.isArray(ingredients)) return { ingredients: {}, price: 0 };

  return ingredients.reduce(
    (acc, ingr) => {
      const detIngr = descriptionIngr.find((descIngr: any) => descIngr._id === ingr);

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
