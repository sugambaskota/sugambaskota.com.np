import axiosInstance from "axios/axiosInstance";

const mutator = (method: string, url: string, data?: any) =>
  axiosInstance({
    method,
    url,
    data,
  }).then((res) => res.data);

export default mutator;
