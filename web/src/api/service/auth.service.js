import api from "@/api/api";
import auth from "@/api/auth";
import Cookies from "js-cookie";
import { AUTH_CONSTANTS } from "@/utils/constants/auth_constants";
export const logOut = async () => {
  const token = process.env.AUTH_TOKEN;
  // const role = process.env.USER_ROLE;
  api.clearToken();
  localStorage.removeItem(token);
  Cookies.remove(AUTH_CONSTANTS.AUTH_TOKEN);
  Cookies.remove(AUTH_CONSTANTS.REFRESH_TOKEN);
  window.location.replace(`/account/login`);
  // localStorage.removeItem(role);
};

export const login = async (body) => {
  return await api.post("/auth/login", body);
};
export const getNewToken = async (refreshToken) => {
  return await api.get("/auth/refresh");
};
export const getCheckInStatus = async (body) => {
  // console.log(body);
  if (auth.checkAuth()) {
    try {
      const res = await api.get("checkin", { ...body });
      return res;
    } catch (error) {
      // if (error.response.status === 401) {
      //   // window.location.replace(`/account/login`);
      // }
    }
  }
};
export const getMyInfo = async (body) => {
  // console.log(body);
  if (auth.checkAuth()) {
    try {
      const res = await api.get("auth/me");
      return res;
    } catch (error) {
      if (error.response.status === 401) {
        // window.location.replace(`/account/login`);
        auth.clearToken();
      }
    }
  } else {
    return null;
  }
};
