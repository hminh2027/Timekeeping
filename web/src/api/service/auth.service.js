import api from "../api";
import auth from "../auth";
export const logOut = async () => {
  const token = process.env.AUTH_TOKEN;
  // const role = process.env.USER_ROLE;
  api.clearToken();
  localStorage.removeItem(token);
  window.location.replace(`/account/login`);
  // localStorage.removeItem(role);
};

export const login = async (body) => {
  return await api.post("/auth/login", body);
};

export const getCheckInStatus = async (body) => {
  // console.log(body);
  if (auth.checkAuth()) {
<<<<<<< HEAD
    return await api.get("checkin", { ...body });
=======
    try {
      const res = await api.get("checkin", { ...body });
      return res;
    } catch (error) {
      if (error.response.status === 401) {
        window.location.replace(`/account/login`);
      }
    }
>>>>>>> 3ed9525df318a9db83041aafe76ccf3165f44041
  }
};
export const getMyInfo = async (body) => {
  // console.log(body);
  if (auth.checkAuth()) {
<<<<<<< HEAD
    return await api.get("auth/me");
=======
    try {
      const res = await api.get("auth/me");
      return res;
    } catch (error) {
      if (error.response.status === 401) {
        window.location.replace(`/account/login`);
      }
    }
>>>>>>> 3ed9525df318a9db83041aafe76ccf3165f44041
  }
};
