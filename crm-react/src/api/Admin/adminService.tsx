// src/api/authService.ts
import apiClient from '../apiClient';
import { toast } from 'react-toastify'; // Import the 'toast' module from the appropriate library

// Define the type for login and register data
interface Admin {
  email: string;
  password: string;
}

interface RegisterData extends Admin {
  username: string;
  email:string;
  password:string;

}

interface CreateDepartmant {
  name: string;
}

interface PutDepartmant {
  id: number;
  name: string;
}

interface DeleteDepartmant {
  id: number;
}

interface AddAdmin {
  name: string;
  email: string;
  password: string;
  departmantId: number;
}

interface UpdateAdmin {
  id: number;
  name: string;
  email: string;
  password: string;
  departmantId: number;
}

interface DeleteAdmin {
  id: number;
}

export const loginAdmin = async (data: Admin) => {
  try {
    const response = await apiClient.post('/api/login/admin', data);
    localStorage.setItem("token", response.data.token);
    toast.success('Login successful');
    console.log(response.data.token);
    setTimeout(() => {
       window.location.href = '/admin'; // Replace '/dashboard' with the path you want to redirect to
    }, 1);
    return response.data.token;
  } catch (error) {
    toast.error('Login failed',{position: "bottom-right"});
    throw new Error(`Login failed: ${error}`);
  }
};

// Register method
export const registerAdmin = async (data: RegisterData) => {
  try {
    const response = await apiClient.post('/api/admin/register', data);
    toast.success('Register successful');

    return response.data;
  } catch (error) {

    toast.error('Register failed');
    throw new Error(`Registration failed: ${error}`);
  }
};

export const createDepartment = async (data: CreateDepartmant) => {
  try {
    const response = await apiClient.post('/api/departmant', data);
    toast.success('Department created');
    return response.data;
  } catch (error) {
    toast.error('Department creation failed');
    throw new Error(`Department creation failed: ${error}`);
  }
};


//DEPARTMENTS
export const getDepartments = async () => {
  try {
    const response = await apiClient.get('/api/departmant');
    return response.data;
  } catch (error) {
    throw new Error(`Department fetch failed: ${error}`);
  }
}

export const putDepartment = async (data: PutDepartmant) => {
  try {
    const response = await apiClient.put(`/api/departmant/${data.id}`, data);
    toast.success('Department updated');
    return response.data;
  } catch (error) {
    toast.error('Department update failed');
    throw new Error(`Department update failed: ${error}`);
  }
}

export const removeDepartment = async (data: DeleteDepartmant) => {
  try {
    const response = await apiClient.delete(`/api/departmant/${data.id}`);
    toast.success('Department removed');
    return response.data;
  } catch (error) {
    toast.error('Department remove failed');
    throw new Error(`Department remove failed: ${error}`);
  }
}

export const getAdmins = async () => {
  try {
    const response = await apiClient.get('/api/admin');
    toast.success('Admins fetched',{position: "bottom-right",autoClose:500});
    return response.data;
  } catch (error) {
    throw new Error(`Admin fetch failed: ${error}`);
  }
}

export const addAdmin = async (data: AddAdmin) => {
  try {
    const response = await apiClient.post('/api/admin', data);
    toast.success('Admin added');
    return response.data;
  } catch (error) {
    throw new Error(`Admin add failed: ${error}`);
  }
}

export const deleteAdmin = async (data: DeleteAdmin) => {
  try {
    const response = await apiClient.delete(`/api/admin/${data.id}`);
    toast.success('Admin deleted');
    return response.data;
  } catch (error) {
    throw new Error(`Admin delete failed: ${error}`);
  }
}
export const updateAdmin = async (data: UpdateAdmin) => {
  try {
    const response = await apiClient.put(`/api/admin/${data.id}`, data);
    toast.success('Admin updated');
    return response.data;
  } catch (error) {
    throw new Error(`Admin update failed: ${error}`);
  }
}

export const getWorks = async () => {
  try {
    const response = await apiClient.get('/api/work');
    toast.success('Works fetched',{position: "bottom-right",autoClose:500}); 
    return response.data;
  } catch (error) {
    toast.error('Work fetch failed',{position: "bottom-right",autoClose:500}); 
    throw new Error(`Work fetch failed: ${error}`);
  }
}
