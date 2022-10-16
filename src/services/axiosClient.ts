import axios from "axios";

const UNSPLASH_PROXY_URL =
  process.env.REACT_APP_UNSPLASH_PROXY_URL || "http://localhost:8080";

export const unsplashClient = axios.create({
  baseURL: UNSPLASH_PROXY_URL,
  timeout: 2000,
});
