import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:500",
});

export default instance;
