import axios from "axios";
import lowerCase from "lodash/lowerCase";
import { API } from "../config/constants";

const axiosRequest = async (method, path, data) => {
  axios.defaults.baseURL = API.API_END_POINT;
  axios.defaults.maxContentLength = 100000000;
  axios.defaults.maxBodyLength = 100000000;
  axios.defaults.timeout = 60 * 4 * 1000;
  axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.headers.common["x-api-key"] = API.API_KEY;

  const axiosConfig = {
    method: lowerCase(method),
    url: path,
    [lowerCase(method) === "get" ? "params" : "data"]: data,
  };

  if (lowerCase(method) !== "get") {
    axiosConfig.data = JSON.stringify(data);
  }

  try {
    const response = await axios(axiosConfig);
    return {
      data: response.data,
      status: response.status,
      ok: true,
    };
  } catch (error) {
    console.log("🚀 ~ axiosRequest ~ error:", error);
    throw error;
  }
};

const http = {
  post: (path, data) => axiosRequest("POST", path, data),
  get: (path, data) => axiosRequest("GET", path, data),
  put: (path, data) => axiosRequest("PUT", path, data),
  deletes: (path, data) => axiosRequest("DELETE", path, data),
  patch: (path, data) => axiosRequest("PATCH", path, data),
};

const executeRequest = (method, { path, params }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const request = http[method](path, params);
      const response = await request;
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const POST = (args) => executeRequest("post", args);
export const GET = (args) => executeRequest("get", args);
export const PUT = (args) => executeRequest("put", args);
export const DELETE = (args) => executeRequest("deletes", args);
export const PATCH = (args) => executeRequest("patch", args);
