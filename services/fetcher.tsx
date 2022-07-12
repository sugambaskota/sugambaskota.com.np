import axiosInstance from "axios/axiosInstance";

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

export default fetcher;
