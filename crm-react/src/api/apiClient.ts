// src/api/apiClient.ts
import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://10.16.17.69:5001/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
