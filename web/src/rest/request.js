import axios from "axios";
import Cookies from "js-cookie";

const request = axios.create({
  baseURL: process.env.API_URL, // TODO: take this api URL from env
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Change request data/error here
request.interceptors.request.use(
  async (config) => {
    const token = await Cookies.get("AUTH_TOKEN");
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token ? token : ""}`,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
