import axios from "axios";
import Cookies from "js-cookie";
import { Router } from "next/router";

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("ERROR", error);
    const { status } = error.response;
    if (status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      console.log("Refresh token", refreshToken);
      Router.push("/account/login");
      // Get new token
    }
    return Promise.reject(error);
  }
);
const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
  Authorization: "",
};

const HEADERS_MUlTIPLE_PART = {
  ...HEADERS,
  "Content-Type": "multipart/form-data; boundary=something",
  Accept: "multipart/form-data",
};

const baseURL = process.env.API_URL;

export const getURL = (url) => {
  if (url.startsWith("http")) {
    return url;
  } else if (url.startsWith("https")) {
    return url;
  }
  return baseURL + url;
};

const setToken = (accessToken) => {
  HEADERS.Authorization = `Bearer ${accessToken}`;
  HEADERS_MUlTIPLE_PART.Authorization = `Bearer ${accessToken}`;
};
const setRefreshToken = (refreshToken) => {
  console.log(refreshToken);
  HEADERS.cookie = refreshToken;
  HEADERS_MUlTIPLE_PART.cookie = refreshToken;
};
const clearToken = () => {
  delete HEADERS.Authorization;
  delete HEADERS_MUlTIPLE_PART.Authorization;
  delete HEADERS.cookie;
  delete HEADERS_MUlTIPLE_PART.cookie;
};

const api = {
  get: (url, params = {}) => {
    console.log("url:", getURL(url));
    // console.log(HEADERS);
    return axios.get(getURL(url), {
      params,
      headers: HEADERS,
    });
  },

  post: (url, body = {}, params = {}) => {
    console.log("url:", getURL(url));
    console.log(HEADERS);
    return axios.post(getURL(url), body, {
      params,
      headers: HEADERS,
    });
  },

  patch: (url, params) => {
    console.log("url:", getURL(url));
    return axios.patch(getURL(url), params, {
      headers: HEADERS,
    });
  },

  delete: (url, params) => {
    console.log("url:", getURL(url));
    console.log("delete header",HEADERS)
    return axios.delete(getURL(url), params, {
      headers:{ ...HEADERS,Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3ROYW1lIjoiTGluaCIsImxhc3ROYW1lIjoiSG_DoG5nIiwiZW1haWwiOiJseW5AdmR0c29sLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY1ODM3OTI1MCwiZXhwIjoxNjU4MzkwMDUwfQ.GGy9ZpMy5I5ydvTdMe2_Yzb90WEiHer8GchFMAZQZbo`},
    });
  },

  postMultiplePart: (url, params) => {
    console.log("url:", getURL(url));
    return axios.post(getURL(url), params, {
      headers: HEADERS_MUlTIPLE_PART,
    });
  },
};

const exportObject = {
  clearToken,
  setToken,
  setRefreshToken,
  ...api,
};

export default exportObject;
