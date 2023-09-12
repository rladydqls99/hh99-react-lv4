import { Cookies } from 'react-cookie';

const cookies = new Cookies();

// 저장
export const setCookie = (name, value, options) => {
  return cookies.set(name, value, { ...options });
};

// 불러오기
export const getCookie = (name) => {
  return cookies.get(name);
};

// 지우기
export const removeCookie = (name) => {
  return cookies.remove(name, { path: '/' });
};
