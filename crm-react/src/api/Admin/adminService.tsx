// src/api/authService.ts
import apiClient from '../apiClient';
import { toast } from 'react-toastify'; // Import the 'toast' module from the appropriate library

// Define the type for login and register data
interface Admin {
  username: string;
  password: string;
}

interface RegisterData extends Admin {
  username: string;
  email:string;
  password:string;

}

export const loginAdmin = async (data: Admin) => {
  try {
    const response = await apiClient.post('/api/admin/login', data);
    localStorage.setItem("token", response.data.token);
    
    // Redirect after 1 millisecond
    // setTimeout(() => {
    //   window.location.href = '/admin/panel'; // Replace '/dashboard' with the path you want to redirect to
    // }, 1);
    toast.success('Login successful');

    console.log(response.data.data.token);

    return response.data.data.token;

  } catch (error) {
    throw new Error(`Login failed: ${error}`);
    toast.success('Login failed');

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
