import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

class AxiosClient {
    public instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: API_BASE_URL,
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    setToken(token: string): this {
        this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return this;
    }
}

const axiosClient = new AxiosClient();

export default axiosClient;