export const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    // eslint-disable-next-line
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
};

export function getCookie(name) {
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
