import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-ihrm-token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  // let seconds = 10;
  // let expires = new Date(new Date() * 1 + seconds * 1000);
  // Cookies.set('username', 'tanggaowei', { expires: expires }); // 10 秒后失效
  return Cookies.set(TokenKey, token, { expires: 1 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
