// src/api/authService.ts
import apiClient from '../apiClient';

// Define the type for login and register data
interface Company {
  email: string;
  password: string;
}

interface RegisterData extends Company {
  id:number;
  name: string;
  email:string;
  password:string;

}


export const login = async (data: Company) => {
  try {
    const response = await apiClient.post('/api/Auth/login', data);
    localStorage.setItem("token", response.data);

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
export const registerMethod = async (data: RegisterData) => {
  try {
    const response = await apiClient.post('/api/Company', data);
    return response.data;
  } catch (error) {
    throw new Error(`Registration failed: ${error}`);
  }
};
