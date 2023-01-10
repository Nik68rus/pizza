export const getCookie = (name: string) => {
  return document.cookie.split(';').some((c) => {
    return c.trim().startsWith(name + '=');
  });
};

export const deleteCookie = (name: string) => {
  if (getCookie(name)) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT';
  }
};
