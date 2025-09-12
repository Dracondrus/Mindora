import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:7777", // потом можно заменить на Render/домен
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
