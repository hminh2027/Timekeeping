import api from "./api";
import Cookies from "js-cookie";
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const TOKEN = process.env.ROLE;

const checkAuth = () => {
  if (typeof window !== "undefined") {
    console.log("set token");
    const accessToken = localStorage.getItem(AUTH_TOKEN);
    // console.log("access token: " + accessToken);
    if (accessToken) {
      api.setToken(accessToken);
      // api.setRefreshToken(refreshToken);
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
const setRefreshToken = (refreshToken) => {
  if (typeof window !== "undefined") {
    // api.setRefreshToken(refreshToken);
    // document.cookie = `refresh_token=${refreshToken}; SameSite=None; Secure`;
    Cookies.set("abc", refreshToken, { domain: ".localhost" });
    localStorage.setItem("refreshToken", refreshToken);
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
const exportObject = {
  clearToken,
  checkAuth,
  setToken,
  setRole,
  setRefreshToken,
};
export default exportObject;
