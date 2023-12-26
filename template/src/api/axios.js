import axios from "axios";
import { TOKEN, tokenExpired } from "src/utils/auth";

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL || "http://localhost:3000"
})


api.interceptors.request.use(async config => {
    config.headers.Authorization = `Bearer ${TOKEN}`;

    return config;
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error?.response?.status === 401) {
            tokenExpired();
        }

        if (error.code === "ERR_NETWORK")
            error.response = { data: { message: `A API não está respondendo. Certifique-se que ela está aberta no endereço: ${error.config.baseURL}` } };

        return Promise.reject(error);
    }
);



export default api;