// src/api/authService.ts
import apiClient from '../apiClient';

// Define the type for login and register data
interface Admin {
  email: string;
  password: string;
}

interface RegisterData extends Admin {
  name: string;
  email:string;
  password:string;

}

export const loginAdmin = async (data: Admin) => {
  try {
    const response = await apiClient.post('/api/Auth/login-admin', data);
    localStorage.setItem("token", response.data.token);
    
    // Redirect after 1 millisecond
    setTimeout(() => {
      window.location.href = '/dashboard'; // Replace '/dashboard' with the path you want to redirect to
    }, 1);

    return response.data;
  } catch (error) {
    throw new Error(`Login failed: ${error}`);
  }
};

// Register method
export const registerAdmin = async (data: RegisterData) => {
  try {
    const response = await apiClient.post('/api/admin', data);
    return response.data;
  } catch (error) {
    throw new Error(`Registration failed: ${error}`);
  }
};
