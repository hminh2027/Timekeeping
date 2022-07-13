import axios from "axios";

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

const baseURL = process.env.APP_URL;

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

const clearToken = () => {
  delete HEADERS.Authorization;
  delete HEADERS_MUlTIPLE_PART.Authorization;
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
  ...api,
};

export default exportObject;
