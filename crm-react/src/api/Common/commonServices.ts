import apiClient from '../apiClient'
import { toast } from 'react-toastify';

export const getDepartmant = async () => {
    try {
        const response = await apiClient.get('/api/departmant');
        return response.data;
    } catch (error) {
        toast.error('Departments get failed');
        throw new Error(`Departments get failed: ${error}`);
    }
}