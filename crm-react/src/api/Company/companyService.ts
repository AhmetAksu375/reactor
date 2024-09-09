// src/api/authService.ts
import apiClient from '../apiClient';

// Define the type for login and register data
interface Company {
  username: string;
  password: string;
}

interface CompanyRegisterData extends Company {
  username: string;
  email:string;
  password:string;
}

interface Subuser {
  username : string;
  email : string;
  password : string;
  companyId : number;
}

export const companyLogin = async (data: Company) => {
  try {
    const response = await apiClient.post('/api/User/login', data);
    localStorage.setItem("token", response.data.token);
    console.log(response.data);
    
    
    // Redirect after 1 millisecond
    setTimeout(() => {
      window.location.href = '/company'; // Replace '/dashboard' with the path you want to redirect to
    }, 1);

    return response.data;
  } catch (error) {
    throw new Error(`Login failed: ${error}`);
  }
};

// Register method
export const companyRegister = async (data: CompanyRegisterData) => {
  try {
    const response = await apiClient.post('/api/User/register', data);
    return response.data;
  } catch (error) {
    throw new Error(`Registration failed: ${error}`);
  }
};


export const cerateSubUser = async (data:Subuser) => {
  try {
    const response = await apiClient.post('/api/Company/create-subuser', data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}