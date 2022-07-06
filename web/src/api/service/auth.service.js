import api from "../api";
import auth from "../auth";

export const logOut = async () => {
  const token = process.env.AUTH_TOKEN;
  const role = process.env.USER_ROLE;
  api.clearToken();
  localStorage.removeItem(token);
  localStorage.removeItem(role);
};

export const login = async (body) => {
  return await api.post("/auth/login", body);
};

export const getCheckInStatus = async (body) => {
  // console.log(body);
  if (await auth.checkAuth()) {
    return await api.get("checkin", { ...body });
  }
};
