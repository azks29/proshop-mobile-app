import axios from "axios";

const instance = axios.create({
  // baseURL: "https://proshop-react-native.herokuapp.com",
  baseURL: "http://10.0.2.2:5000",
});

export default instance;
