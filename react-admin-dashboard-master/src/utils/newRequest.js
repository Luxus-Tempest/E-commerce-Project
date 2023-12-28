import axios from "axios";


const newResquest = axios.create({
    baseURL: "http://localhost:8080/FIVERR/",
     withCredentials: true,
});

export default newResquest;