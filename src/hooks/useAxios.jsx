import axios from "axios";

const axiosUrl = axios.create({
  baseURL: "http://localhost:5000",
  // "https://share-holder-manage-server.vercel.app",
});

const useAxios = () => {
  return axiosUrl;
};

export default useAxios;