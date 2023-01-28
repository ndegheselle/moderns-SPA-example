import axios from "axios";

const version = "v1";
const instance = axios.create({
    baseURL: `http://localhost:8000/${version}`
});
  
export default instance;