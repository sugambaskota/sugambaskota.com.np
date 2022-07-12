import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  function (config: any) {
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
