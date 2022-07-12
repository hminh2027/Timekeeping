import api from "./api";
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const TOKEN = process.env.ROLE;

const checkAuth = () => {
  if (typeof window !== "undefined") {
    console.log("set token");
    const accessToken = localStorage.getItem(AUTH_TOKEN);
    if (accessToken) {
      api.setToken(accessToken);
      return true;
    }
    return false;
  }
};

const setToken = (accessToken) => {
  if (typeof window !== "undefined") {
    api.setToken(accessToken);
    localStorage.setItem(AUTH_TOKEN, accessToken);
  }
};

const setRole = (role) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN, role);
  }
};

const clearToken = () => {
  if (typeof window !== "undefined") {
    api.clearToken();
    localStorage.removeItem(AUTH_TOKEN);
  }
};
const exportObject = { clearToken, checkAuth, setToken, setRole };
export default exportObject;
