import api from "./api";
import Cookies from "js-cookie";
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const TOKEN = process.env.ROLE;

const checkAuth = () => {
  if (typeof window !== "undefined") {
    console.log("set token");
    const accessToken = localStorage.getItem(AUTH_TOKEN);
    // const refreshToken = document.cookie
    //   .split("; ")
    //   .find((row) => row.startsWith("refresh_token="))
    //   ?.split("=")[1];
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
    api.setRefreshToken(refreshToken);
    // document.cookie = `refresh_token=${refreshToken}; SameSite=None; Secure`;
    Cookies.set("refreshToken", refreshToken, { domain: ".localhost" });
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
