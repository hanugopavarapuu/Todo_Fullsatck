import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1/todo",
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;