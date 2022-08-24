import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const headers: any = {};

headers["x-app-id"] = process.env.REACT_APP_APP_ID;
headers["x-app-key"] = process.env.REACT_APP_APP_KEY;
headers["x-remote-user-id"] = process.env.REACT_APP_REMOTE_USER_ID;

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers,
});

axiosInstance.interceptors.response.use(
  (response) =>
    new Promise((resolve) => {
      resolve(response);
    }),
  (error) => {
    if (!error.response) {
      return new Promise((_resolve, reject) => {
        reject(error);
      });
    } else {
      return new Promise((_resolve, reject) => {
        reject(error);
      });
    }
  }
);

export default axiosInstance;
