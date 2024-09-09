// src/api/apiClient.ts
import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://10.16.17.69:5000/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
