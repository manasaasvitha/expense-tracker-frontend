import axios from "axios";

const instance = axios.create({
  baseURL: "https://expense-tracker-backend-1sbp.onrender.com/api",
});

export default instance;
