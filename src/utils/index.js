const TOKEN_KEY = "jwt";

export const login = (value) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(value));
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isLogin = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }
  return false;
};
