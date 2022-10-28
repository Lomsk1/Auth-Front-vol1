import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

const baseURL = "http://127.0.0.1:8000/";




const authTokens = localStorage.getItem("authTokens")
  ? JSON.parse(localStorage.getItem("authTokens"))
  : null;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${authTokens?.access}`,
    "Content-Type": "application/json",
    // 'X-CSRFToken': csrftoken
  },
  withCredentials: true,
});

export const axiosUnAuthorized = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    "Content-Type": "application/json",
    // Cookies:  `csrftoken=${'sadwwwdbfosiucbacvaskc'}`,
  },
  withCredentials: "true",
  // Cookies:  `csrftoken=${'sadwwwdbfosiucbacvaskc'}`,
});

axiosInstance.interceptors.request.use(async req => {
  if (!authTokens) {
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;
    req.headers.Authorization = `Bearer ${authTokens.access}`;
  }

  const user = jwt_decode(authTokens.access);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
  if (!isExpired) return req;

  const response = await axios.post(`${baseURL}auth/jwt/refresh/`, {
    refresh: authTokens.refresh,
  });

  localStorage.setItem("authTokens", JSON.stringify(response.data));
  req.headers.Authorization = `Bearer ${response.data.access}`;

  return req;
});

export default axiosInstance;
