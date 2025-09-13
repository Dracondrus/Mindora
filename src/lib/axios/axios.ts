import axios from "axios";

const api = axios.create({
  // https://mindora-backend-express-js.onrender.com/
  //  " http://localhost:7777"
  baseURL: "https://mindora-backend-express-js.onrender.com", // потом можно заменить на Render/домен
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
